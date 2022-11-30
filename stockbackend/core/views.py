import pandas as pd
import os
import glob
import joblib
import yfinance as yf

from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
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


def fundamental(request):
	
	from catboost import CatBoostRegressor
	model = CatBoostRegressor()
	
	path_cat_model = 'D:/projects/Fundamental/FunStock/stockbackend/core/Models/ModelCatBoost'
	model_files_f = glob.glob(os.path.join(path_cat_model, '*.cbm'))
	stocks_list = list()
	predictions = list()
	stocks_price = list()
	
	for t in model_files_f:
		model.load_model(t)
		stockname = t.split('\\')[1].split('_')[0]

		# ticker = stockname+".NS"
		# print(ticker)
		# ticker_yahoo = yf.Ticker(ticker)
		# stockPrice = ticker_yahoo.history()['Close'].iloc[-1]
		# stocks_price.append(stockPrice)
		stocks_list.append(stockname)

		stockfile = 'D:/projects/Fundamental/FunStock/stockbackend/core/Data/StockDataForCatBoost/' + stockname + '.csv'
		data = pd.read_csv(stockfile)
		pred = model.predict(data)
		predictions.append(pred[0])
		result_dict_cat = {'Stock Name': stocks_list, 'Predictions': predictions}
		result_cat = pd.DataFrame.from_dict(result_dict_cat)

		print(result_cat)

    #LightGBM

	from .lightBGMstocks import get_prediction
	result_lightgbm = get_prediction()

	#Random Forest
	path_rf_model = 'D:/projects/Fundamental/FunStock/stockbackend/core/Models/ModelRandomForest'
	model_files_f = glob.glob(os.path.join(path_rf_model, '*.joblib'))

	stocks_list = list()
	predictions = list()
	stocks_price = list()

	for t in model_files_f:
		estimator = joblib.load(t)
		stockname = t.split('\\')[1].split('_')[0].split('best')[0]

		# ticker = stockname + ".NS"
		# ticker_yahoo = yf.Ticker(ticker)
		# stockPrice = ticker_yahoo.history()['Close'].iloc[-1]
		# stocks_price.append(stockPrice)

		if stockname == 'M':
			stockname = 'M_M'

		stocks_list.append(stockname)

		stockfile = 'D:/projects/Fundamental/FunStock/stockbackend/core/Data/StockDataForRandomForest/' + stockname + '.csv'

		data = pd.read_csv(stockfile)
		pred = estimator.predict(data)
		predictions.append(pred[0])

		result_rf_dict = {'Stock Name': stocks_list, 'Predictions': predictions}
		result_rf = pd.DataFrame.from_dict(result_rf_dict)

	#XG Boost
	import pickle

	path_xg_model = 'D:/projects/Fundamental/FunStock/stockbackend/core/Models/ModelXGBoost'
	model_files_f = glob.glob(os.path.join(path_xg_model, '*.joblib'))
	stocks_list = list()
	predictions = list()
	stocks_price = list()

	for t in model_files_f:
		model = pickle.load(open(t, "rb"))
		stockname = t.split('\\')[1].split('_')[0].split('best')[0]

		# ticker_s = removeSpaces(stockname)

		# ticker = ticker_s + ".NS"
		# print(ticker_s)
		# print(ticker)
		# ticker_yahoo = yf.Ticker(ticker)
		# stockPrice = ticker_yahoo.history()['Close'].iloc[-1]
		# stocks_price.append(stockPrice)

		stocks_list.append(stockname)
		stockfile = 'D:/projects/Fundamental/FunStock/stockbackend/core/Data/StockDataForXGBoost/' + stockname + '.csv'
		data = pd.read_csv(stockfile)
		pred = model.predict(data)
		predictions.append(pred[0])

		result_dict = {'Stock Name': stocks_list, 'Predictions': predictions}
		result_xg = pd.DataFrame.from_dict(result_dict)

	print(pd.concat([result_cat,result_lightgbm,result_rf,result_xg],axis=0).reset_index(0))

	return HttpResponse("Fundamental Valuations Model Run!")

def technical(request,stockName):

	from .lstmpred import lstm_prediction

	lstm_prediction('NSE',stock_symbol=stockName)



