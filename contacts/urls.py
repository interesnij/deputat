from django.urls import re_path as url
from contacts.views import ContactsView


urlpatterns = [
    url(r'^$', ContactsView.as_view(), name='contacts'),
]
