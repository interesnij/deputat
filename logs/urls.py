from django.urls import re_path as url
from logs.views import LogsView


urlpatterns = [
    url(r'^$', LogsView.as_view(), name='logs'),
]
