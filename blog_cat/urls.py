from django.urls import re_path as url
from blog_cat.views import BlogListView


urlpatterns = [
    url(r'^$', BlogListView.as_view(), name='blog_list'),
]
