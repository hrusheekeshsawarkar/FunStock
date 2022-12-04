from pandas_datareader import data as pdr
import yfinance as yf
import numpy as np
from keras.models import load_model

def lstm_prediction(se, stock_symbol):
    print(stock_symbol)
    def fetch_stock_data(se, stock_symbol,sdate,edate):
        print(stock_symbol)
        """fetch stock data"""
        from pandas_datareader import data as pdr
        yf.pdr_override()
        if se == 'NSE': stock_symbol += ".NS"
        return yf.download(stock_symbol, start=sdate, end=edate)
    df = fetch_stock_data('NSE', stock_symbol,'2013-01-01','2021-11-30')
    df2 = fetch_stock_data('NSE', stock_symbol,'2021-12-01','2022-11-30')
    df = df.dropna()
    df = df.reset_index(drop=True)
    df2 = df2.dropna()
    df2 = df2.reset_index(drop=True)

    ema_26_dataset1 = []
    ema_12_dataset1 = []
    macd = []
    smoothing = 2

    for num in range(len(df)):
        if num == 0:
            temp1 = df['Adj Close'][num] * (smoothing / (1 + 26))
            temp2 = df['Adj Close'][num] * (smoothing / (1 + 12))
            ema_26_dataset1.append(temp1)
            ema_12_dataset1.append(temp2)
            macd.append(ema_12_dataset1[num] - ema_26_dataset1[num])
        else:
            temp1 = (df['Adj Close'][num] * (smoothing / (1 + 26))) - (
                        ema_26_dataset1[num - 1] * (1 - (smoothing / (1 + 26))))
            temp2 = (df['Adj Close'][num] * (smoothing / (1 + 12))) - (
                        ema_12_dataset1[num - 1] * (1 - (smoothing / (1 + 12))))
            ema_26_dataset1.append(temp1)
            ema_12_dataset1.append(temp2)
            macd.append(ema_12_dataset1[num] - ema_26_dataset1[num])

    df['MACD'] = macd
    ema_26_dataset2 = []
    ema_12_dataset2 = []
    macd2 = []
    smoothing = 2

    print("2" * 50)

    for num in range(len(df2)):
        if num == 0:
            temp1 = df2['Adj Close'][num] * (smoothing / (1 + 26))
            temp2 = df2['Adj Close'][num] * (smoothing / (1 + 12))
            ema_26_dataset2.append(temp1)
            ema_12_dataset2.append(temp2)
            macd2.append(ema_12_dataset2[num] - ema_26_dataset2[num])
        else:
            temp1 = (df2['Adj Close'][num] * (smoothing / (1 + 26))) - (
                        ema_26_dataset2[num - 1] * (1 - (smoothing / (1 + 26))))
            temp2 = (df2['Adj Close'][num] * (smoothing / (1 + 12))) - (
                        ema_12_dataset2[num - 1] * (1 - (smoothing / (1 + 12))))
            ema_26_dataset2.append(temp1)
            ema_12_dataset2.append(temp2)
            macd2.append(ema_12_dataset2[num] - ema_26_dataset2[num])

    df2['MACD'] = macd2
    mfi_dataset1 = []

    print("3" * 50)

    for num in range(14, len(df)):
        typical_price = (df['High'][num] + df['Low'][num] + df['Close'][num]) / 3
        raw_money_flow = typical_price * df['Volume'][num]
        positive_money_flow = 0
        negative_money_flow = 0
        curr_money_flow = raw_money_flow
        num1 = num - 1
        while num1 >= num - 14:
            typical_price1 = (df['Close'][num1] + df['Low'][num1] + df['High'][num1]) / 3
            raw_money_flow1 = typical_price1 * df['Volume'][num1]
            if raw_money_flow1 < curr_money_flow:
                positive_money_flow += curr_money_flow
            else:
                negative_money_flow += curr_money_flow
            curr_money_flow = raw_money_flow1
            num1 -= 1
        money_flow_ratio = positive_money_flow / negative_money_flow
        mfi = 100 - 100 / (1 + money_flow_ratio)
        mfi_dataset1.append(mfi)

    mfi_dataset2 = []

    for num in range(14, len(df2)):
        typical_price = (df2['High'][num] + df2['Low'][num] + df2['Close'][num]) / 3
        raw_money_flow = typical_price * df2['Volume'][num]
        positive_money_flow = 0
        negative_money_flow = 0
        curr_money_flow = raw_money_flow
        num1 = num - 1
        while num1 >= num - 14:
            typical_price1 = (df2['Close'][num1] + df2['Low'][num1] + df2['High'][num1]) / 3
            raw_money_flow1 = typical_price1 * df['Volume'][num1]
            if raw_money_flow1 < curr_money_flow:
                positive_money_flow += curr_money_flow
            else:
                negative_money_flow += curr_money_flow
            curr_money_flow = raw_money_flow1
            num1 -= 1
        money_flow_ratio = positive_money_flow / negative_money_flow
        mfi = 100 - 100 / (1 + money_flow_ratio)
        mfi_dataset2.append(mfi)

    df = df[:][14:]
    df2 = df2[:][14:]
    df['MFI'] = mfi_dataset1
    df2['MFI'] = mfi_dataset2

    print(df)

    dataset = df.drop(['Close'], axis=1)
    dataset2 = df2.drop(['Close'], axis=1)

    dataset.rename(columns={'Adj Close': 'Prediction Price'}, inplace=True)
    dataset2.rename(columns={'Adj Close': 'Prediction Price'}, inplace=True)

    print("1" * 50)

    from sklearn.preprocessing import MinMaxScaler
    min_max_scaler = MinMaxScaler()

    dataset[["Open", "High", "Low", "Prediction Price", "Volume", "MACD", "MFI"]] = min_max_scaler.fit_transform(
        dataset[["Open", "High", "Low", "Prediction Price", "Volume", "MACD", "MFI"]])

    dataset2[["Open", "High", "Low", "Prediction Price", "Volume", "MACD", "MFI"]] = min_max_scaler.fit_transform(
        dataset2[["Open", "High", "Low", "Prediction Price", "Volume", "MACD", "MFI"]])

    new_dataset = dataset.copy()
    new_dataset2 = dataset2.copy()
    n_train = len(new_dataset)
    n_test = len(new_dataset2)
    train_data = new_dataset.iloc[:n_train, :].values
    test_data = new_dataset2.iloc[:n_test, :].values

    import numpy
    def create_dataset(dataset, time_step=1):
        dataX, dataY = [], []
        for i in range(len(dataset) - time_step - 1):
            a = dataset[i:(i + time_step), [0, 1, 2, 4, 5, 6]]
            dataX.append(a)
            dataY.append(dataset[i + time_step, 3])
        # print(dataX,dataY)
        return numpy.array(dataX), numpy.array(dataY)

    time_step = 100
    X_train, y_train = create_dataset(train_data, time_step)
    X_test, y_test = create_dataset(test_data, time_step)

    model_name = 'D:/projects/Fundamental/FunStock/stockbackend/core/TechModels/'+stock_symbol+'_price.h5'
    model = load_model(model_name)

    train_predict = model.predict(X_train)
    test_predict = model.predict(X_test)

    trainPredict_dataset_like = np.zeros(shape=(len(train_predict), 7))
    trainPredict_dataset_like[:, 0] = train_predict[:, 0]
    train_predict = min_max_scaler.inverse_transform(trainPredict_dataset_like)[:, 0]

    testPredict_dataset_like = np.zeros(shape=(len(test_predict), 7))
    testPredict_dataset_like[:, 0] = test_predict[:, 0]
    test_predict = min_max_scaler.inverse_transform(testPredict_dataset_like)[:, 0]

    ogiPredict_dataset_like = np.zeros(shape=(len(test_predict), 7))
    ogiPredict_dataset_like[:, 0] = y_test
    y_test = min_max_scaler.inverse_transform(ogiPredict_dataset_like)[:, 0]

    import matplotlib.pyplot as plt
    plt.plot(y_test, color='b')
    plt.plot(test_predict, color='r')
    plt.title('Predicted Vs Actual for LSTM')
    plt.legend(['Actual', 'Predicted'])
    plt.xlabel('Time Period')
    plt.ylabel('Price ($)')
    min1 = min(test_predict) // 2
    max1 = max(test_predict) * 3
    plt.ylim(min1, max1)

    lst_output = []
    n_steps = 100
    nextNumberOfDays = 30
    i = 0

    while (i < nextNumberOfDays):
        x_input = X_test[i:]

        if (len(x_input) > 100):
            yhat = model.predict(x_input)
            lst_output.append(float(yhat[100]))
        i = i + 1

    test_predict1 = (model.predict(X_test))

    predicted_price = []
    final_price = []

    for d in test_predict1:
        predicted_price.append(d[0])

    for d in lst_output:
        predicted_price.append(d)

    for d in predicted_price:
        trainPredict_dataset_like[:, 0] = float(d)
        train_predict = min_max_scaler.inverse_transform(trainPredict_dataset_like)[:, 0]
        final_price.append(train_predict[0])

    print(final_price)

    import matplotlib.pyplot as plt

    plt.plot(y_test, color='b')
    plt.plot(final_price, color='r')
    plt.title('Predicted Vs Actual for LSTM')
    plt.legend(['Actual', 'Predicted'])
    plt.xlabel('Time Period')
    plt.ylabel('Price ($)')
    min1 = min(final_price) // 2
    max1 = max(final_price) * 1.5
    plt.ylim(min1, max1)

    plt_name = 'D:/projects/Fundamental/FunStock/fun_ui/src/components/media/'+stock_symbol+'.png'
    plt.savefig(plt_name)

# lstm_prediction('NSE','ADANIPORTS')
