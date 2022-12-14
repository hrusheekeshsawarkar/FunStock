import lightgbm as lgb
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
import pandas as pd

import joblib

import os
import glob

path = 'stockprediction/Data/StockDataForLightGBM'
csv_files_f = glob.glob(os.path.join(path,'*.csv'))

stockname_list = list()
predictions = list()

def get_prediction():

    for t in csv_files_f:

        filename = t.split("\\")[-1]
        stock = t.split(".")[0]
        stockname = stock.split('\\')[1]
        stockname_list.append(stockname)

        data = pd.read_csv(t)

        x = data.iloc[:, 1:-1]
        y = data.iloc[:, -1:]

        x_train_data, x_rest_data, y_train_data, y_rest_data = train_test_split(x, y, train_size=0.8, random_state=1)
        x_validation_data, x_test_data, y_validation_data, y_test_data = train_test_split(x_rest_data, y_rest_data,train_size=0.5, random_state=1)

        x_train_data.to_csv('X Train Data.csv')
        y_train_data.to_csv('Y Train Data.csv')

        # Test Data
        x_test_data.to_csv('X Test Data.csv')
        y_test_data.to_csv('Y Test Data.csv')

        # Validation Data
        x_validation_data.to_csv('X ValidData.csv')
        y_validation_data.to_csv('Y ValidData.csv')

        params = {
            'task': 'train',
            'boosting': 'gbdt',
            'objective': 'regression',
            'num_leaves': 10,
            'learning_rate': 0.05,
            'metric': {'l2', 'l1'},
            'verbose': -1
        }

        lgb_train = lgb.Dataset(x_train_data, y_train_data)
        lgb_eval = lgb.Dataset(x_test_data, y_test_data, reference=lgb_train)

        model = lgb.train(params,
                          train_set=lgb_train,
                          valid_sets=[lgb_eval],
                          early_stopping_rounds=30)

        stockFileName = 'stockprediction/Data/StockDataForLightGBM/'+stockname+'.csv'
        x_data = pd.read_csv(stockFileName)
        y_pred = model.predict(x_data)
        predictions.append(y_pred[0])

        Stock_dict = {'Stock Name': stockname_list, 'Prediction': predictions}
        result = pd.DataFrame.from_dict(Stock_dict)

        return result