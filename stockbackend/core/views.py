import pandas as pd
import os
import glob
import joblib
import yfinance as yf
import json
from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
from rest_framework import viewsets
from rest_framework.decorators import api_view

from django.http import HttpResponse
# Create your views here.

class ReactView(APIView):
	
	serializer_class = ReactSerializer

	def get(self, request):
		detail = [ {"Capital": detail.capital,"Years": detail.years, "Risk": detail.risk}
		for detail in Form.objects.all()]
		return Response(detail)

	def post(self, request):
         print(request.data)
         serializer = ReactSerializer(data=request.data)
         if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class ImageView(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

@api_view(['GET'])
def showAllImage(request):

    images = Image.objects.all()
    serilizer = ImageSerializer(images, many=True)
    return Response(serilizer.data)


def fundamental(request):
	
	from catboost import CatBoostRegressor
	model = CatBoostRegressor()
	
	path_cat_model = 'D:/projects/Fundamental/FunStock/stockbackend/core/Models/ModelCatBoost'
	model_files_f = glob.glob(os.path.join(path_cat_model, '*.cbm'))
	
	stocks_list = list()
	stocks_names = list()
	predictions = list()
	stocks_price = list()
	
	for t in model_files_f:
		model.load_model(t)
		stockn = t.split('\\')[1].split('_')[0]
		stocks_names.append(stockn)

		stockname = Stocks.get(stockn)
		if stockname is None:
			stockname = stockn
		
		ticker_s = removeSpaces(stockname)
		ticker = ticker_s+".NS"

		ticker_yahoo = yf.Ticker(ticker)
		stockPrice = ticker_yahoo.history()['Close'].iloc[-1]
		stockPrice = round(stockPrice,2)
		stocks_price.append(stockPrice)
		stocks_list.append(stockname)

		stockfile = 'D:/projects/Fundamental/FunStock/stockbackend/core/Data/StockDataForCatBoost/' + stockn + '.csv'
		data = pd.read_csv(stockfile)
		pred = model.predict(data)
		predictions.append(pred[0])
		result_dict_cat = {'Ticker': stocks_list,'StockName': stocks_names, 'Predictions': predictions,'StockPrice':stocks_price}
		result_cat = pd.DataFrame.from_dict(result_dict_cat)

    #LightGBM

	from .lightBGMstocks import get_prediction
	result_lightgbm = get_prediction()
	print(result_lightgbm)

	#Random Forest
	path_rf_model = 'D:/projects/Fundamental/FunStock/stockbackend/core/Models/ModelRandomForest'
	model_files_f = glob.glob(os.path.join(path_rf_model, '*.joblib'))

	stocks_list = list()
	stocks_names = list()
	predictions = list()
	stocks_price = list()

	for t in model_files_f:
		estimator = joblib.load(t)
		stockn = t.split('\\')[1].split('_')[0].split('best')[0]
		stocks_names.append(stockn)

		if stockn == 'M':
			stockn = 'M_M'

		stockname = Stocks.get(stockn)
		if stockname is None:
			stockname = stockn

		ticker_s = removeSpaces(stockname)
		ticker = ticker_s + ".NS"
		ticker_yahoo = yf.Ticker(ticker)
		stockPrice = ticker_yahoo.history()['Close'].iloc[-1]
		stockPrice = round(stockPrice,2)

		stocks_price.append(stockPrice)

		stocks_list.append(stockname)

		stockfile = 'D:/projects/Fundamental/FunStock/stockbackend/core/Data/StockDataForRandomForest/' + stockn + '.csv'

		data = pd.read_csv(stockfile)
		pred = estimator.predict(data)
		predictions.append(pred[0])

		result_rf_dict = {'Ticker': stocks_list,'StockName': stocks_names, 'Predictions': predictions,'StockPrice': stocks_price}
		result_rf = pd.DataFrame.from_dict(result_rf_dict)

	#XG Boost
	import pickle

	path_xg_model = 'D:/projects/Fundamental/FunStock/stockbackend/core/Models/ModelXGBoost'
	model_files_f = glob.glob(os.path.join(path_xg_model, '*.joblib'))
	stocks_list = list()
	predictions = list()
	stocks_price = list()
	stocks_names = list()

	for t in model_files_f:
		model = pickle.load(open(t, "rb"))
		stockn = t.split('\\')[1].split('_')[0].split('best')[0]
		stocks_names.append(stockn)

		stockname = Stocks.get(stockn)
		if stockname is None:
			stockname = stockn

		ticker_s = removeSpaces(stockname)

		ticker = ticker_s + ".NS"

		ticker_yahoo = yf.Ticker(ticker)
		stockPrice = ticker_yahoo.history()['Close'].iloc[-1]
		stockPrice = round(stockPrice,2)
		stocks_price.append(stockPrice)

		# ticker_s = removeSpaces(stockname)

		# ticker = ticker_s + ".NS"
		# print(ticker_s)
		# print(ticker)
		
		# ticker_yahoo = yf.Ticker(ticker)
		# stockPrice = ticker_yahoo.history()['Close'].iloc[-1]
		# stocks_price.append(stockPrice)

		stocks_list.append(stockname)
		stockfile = 'D:/projects/Fundamental/FunStock/stockbackend/core/Data/StockDataForXGBoost/' + stockn + '.csv'
		data = pd.read_csv(stockfile)
		pred = model.predict(data)
		predictions.append(pred[0])

		result_dict = {'Ticker': stocks_list,'StockName': stocks_names, 'Predictions': predictions,'StockPrice':stocks_price}
		result_xg = pd.DataFrame.from_dict(result_dict)

	final_res = pd.concat([result_cat,result_lightgbm,result_rf,result_xg],axis=0).reset_index(0)
	final_res.drop(['index'],axis=1)

	final_res['Difference'] = final_res.apply(lambda row: row['StockPrice']-row['Predictions'],axis=1)
	final_res['Percent'] = final_res.apply(lambda row: row['Difference']/row['StockPrice']*100,axis=1)
	final_res['Valuation'] = final_res.apply(lambda row: get_valuation(row['Percent']),axis=1)
	d = final_res.to_json(orient='records')
	return HttpResponse(d)

def technical(request,stockName):

	from .lstmpred import lstm_prediction

	lstm_prediction('NSE',stock_symbol=stockName)

	return HttpResponse('D:/projects/Fundamental/FunStock/stockbackend/core/Plots/ADANIPORTS.png')

def get_valuation(x):
    if x<0:
        return 'UnderValued'
    if x>0 and x<8:
        return 'ValuedProperly'
    if x>8 and x<20:
        return 'OverValued'
    else:
        return 'Highly Overvalued'

def removeSpaces(string):
    string = string.replace(' ','')
    return string

Stocks = {
    'Tech Mahindra':'TECHM','Bajaj Auto':'BAJAJ-AUTO','SBI Life Insurance':'SBILIFE','Tata Consumer':'TATACONSUM',
    'Bajaj Finance':'BAJFINANCE', 'Bajaj Finserve':'BAJAJFINSV', 'Bharti Airtel':'BHARTIARTL','M_M':'M&M','Nestle':'NESTLEIND'
}
