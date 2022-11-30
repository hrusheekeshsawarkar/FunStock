from rest_framework import serializers
from . models import *
  
class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = ['capital', 'years', 'risk']



class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['stockName', 'ticker', 'price', 'valuation']