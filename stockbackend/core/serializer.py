from rest_framework import serializers
from . models import *
  
class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['stockName', 'ticker', 'price', 'valuation']