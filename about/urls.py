from django.urls import re_path as url
from about.views import AboutView, FeedbackView


urlpatterns = [
    url(r'^$', AboutView.as_view(), name='about'),
    url(r'^send_message/$', FeedbackView.as_view()),
]
