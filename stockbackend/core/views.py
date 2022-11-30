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
