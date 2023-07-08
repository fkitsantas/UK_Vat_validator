from django.urls import path
from vat_validation.views import validate_vat

urlpatterns = [
    path('validate_vat/', validate_vat, name='validate_vat'),
]