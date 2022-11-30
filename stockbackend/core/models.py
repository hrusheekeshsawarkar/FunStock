from django.db import models

# Create your models here.


# class React(models.Model):
# 	name = models.CharField(max_length=30)
# 	detail = models.CharField(max_length=500)


class Form(models.Model):
    capital = models.TextField(max_length=10)
    years = models.TextField(max_length=2)
    risk = models.TextField(max_length=8)



class Stock(models.Model):
    stockName = models.TextField(max_length=30)
    ticker = models.TextField(max_length=30)
    price = models.TextField(max_length=30)
    valuation = models.TextField(max_length=30)
    