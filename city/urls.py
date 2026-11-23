from django.urls import re_path as url
from city.views import *


urlpatterns = [
    url(r'^(?P<slug>[\w\-]+)/$', CityDetailView.as_view(), name='city_detail'),
]
