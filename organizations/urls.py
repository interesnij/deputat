from organizations.views import *
from django.urls import re_path as url


urlpatterns=[
	url(r'^$', AllOrganizationsList.as_view(), name="all_organizations"),
	url(r'^suggest_organization/$', SuggestOrganizationView.as_view()),
]
