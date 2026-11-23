from django.urls import re_path as url
from policy.views import PolicyView


urlpatterns = [
    url(r'^(?P<pk>\d+)/$', PolicyView.as_view(), name='policy'),
]
