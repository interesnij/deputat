import sys,os
import re
import requests
from bs4 import BeautifulSoup
from bs4.dammit import EncodingDetector

project_dir = '../deputat/deputat/'

sys.path.append(project_dir)
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'
import django
django.setup()

from elect.models import Elect
from lists.models import AuthorityList
from django.db.models import Q

query = Q(slug="candidate_municipal")|Q(slug="candidate_duma")

lists = AuthorityList.objects.filter(query)

def copy_birthday(list):
    old = list[0].birthday
    for i in list:
        if not i.birthday == old:
            return False
    return True

elects = Elect.objects.filter(list__slug="candidate_municipal")
count = 0
for elect in elects:
    if Elect.objects.filter(name=elect.name).values("pk").count() > 2:
        count += 1
        print (count, ", Двойники: ")

        for el in Elect.objects.filter(name=elect.name):
            print(copy_birthday(Elect.objects.filter(name=elect.name)))
            #print ( el.name , el.birthday, el.area)
