from django.views.generic.base import TemplateView
from communities.models import Community
from django.views import View
from django.http import HttpResponse, Http404
from users.models import User


class SuggestCommunityView(TemplateView):
	template_name = None

	def get(self,request,*args,**kwargs):
		from common.templates import get_detect_platform_template

		self.template_name = get_detect_platform_template("communities/manage/suggest_community.html", request.user, request.META['HTTP_USER_AGENT'])
		return super(SuggestCommunityView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		from communities.forms import CommunityForm
		from communities.models import CommunityCategory

		c = super(SuggestCommunityView,self).get_context_data(**kwargs)
		c["form"], c["categories"] = CommunityForm(), CommunityCategory.objects.only("id")
		return c

	def post(self,request,*args,**kwargs):
		from common.templates import render_for_platform
		from communities.forms import CommunityForm

		self.form = CommunityForm(request.POST)
		if self.form.is_valid() and request.is_ajax():
			_community = self.form.save(commit=False)
			community = _community.suggest_community(name=_community.name, category=_community.category, creator=request.user, description=_community.description)
			return render_for_platform(request, 'communities/detail/suggest_community.html',{'community': community, 'user': request.user})
		else:
			from django.http import HttpResponseBadRequest
			return HttpResponseBadRequest()


class CommunitiesCatsView(TemplateView):
	template_name, categ = "desctop/communities/communities_cats.html", None

	def get(self,request,*args,**kwargs):
		from communities.models import CommunitySubCategory
		self.categ = CommunitySubCategory.objects.filter(sudcategory__order=self.kwargs["order"])
		return super(CommunitiesCatsView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context = super(CommunitiesCatsView,self).get_context_data(**kwargs)
		context["categ"] = self.categ
		return context


class CommunityMemberCreate(View):
	def get(self,request,*args,**kwargs):
		if request.is_ajax():
			c = Community.objects.get(pk=self.kwargs["pk"])
			request.user.join_community(c)
			return HttpResponse()
		else:
			raise Http404
class CommunityMemberDelete(View):
	def get(self,request,*args,**kwargs):
		if request.is_ajax():
			c = Community.objects.get(pk=self.kwargs["pk"])
			request.user.leave_community(c)
			return HttpResponse()
		else:
			raise Http404

class CommunityManageMemberCreate(View):
	def get(self,request,*args,**kwargs):
		user, c = User.objects.get(pk=self.kwargs["user_pk"]), Community.objects.get(pk=self.kwargs["pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(c.pk):
			user.join_community(c)
			return HttpResponse()
		else:
			raise Http404
class CommunityManageMemberDelete(View):
	def get(self,request,*args,**kwargs):
		user, c = User.objects.get(pk=self.kwargs["user_pk"]), Community.objects.get(pk=self.kwargs["pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(c.pk):
			user.leave_community(ck)
			return HttpResponse()
		else:
			raise Http404

class CommunityAdminCreate(View):
	def get(self,request,*args,**kwargs):
		user, community = User.objects.get(pk=self.kwargs["user_pk"]), Community.objects.get(pk=self.kwargs["community_pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(community.pk):
			new_admin = self.community.add_administrator(self.user)
			return HttpResponse()
		else:
			raise Http404
class CommunityAdminDelete(View):
	def get(self,request,*args,**kwargs):
		community, user = Community.objects.get(pk=self.kwargs["community_pk"]), User.objects.get(pk=self.kwargs["user_pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(self.community.pk):
			new_admin = self.community.remove_administrator(self.user)
			return HttpResponse()
		else:
			raise Http404

class CommunityModerCreate(View):
	def get(self,request,*args,**kwargs):
		community, user = Community.objects.get(pk=self.kwargs["community_pk"]), User.objects.get(pk=self.kwargs["user_pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(self.community.pk):
			new_moderator = self.community.add_moderator(self.user)
			return HttpResponse()
		else:
			raise Http404
class CommunityModerDelete(View):
	def get(self,request,*args,**kwargs):
		community, user = Community.objects.get(pk=self.kwargs["community_pk"]), User.objects.get(pk=self.kwargs["user_pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(self.community.pk):
			new_moderator = self.community.remove_moderator(self.user)
			return HttpResponse()
		else:
			raise Http404

class CommunityEditorCreate(View):
	def get(self,request,*args,**kwargs):
		community, user = Community.objects.get(pk=self.kwargs["community_pk"]), User.objects.get(pk=self.kwargs["user_pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(self.community.pk):
			new_editor = self.community.add_editor(self.user)
			return HttpResponse()
		else:
			raise Http404
class CommunityEditorDelete(View):
	def get(self,request,*args,**kwargs):
		community, user = Community.objects.get(pk=self.kwargs["community_pk"]), User.objects.get(pk=self.kwargs["user_pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(self.community.pk):
			new_editor = self.community.remove_editor(self.user)
			return HttpResponse()
		else:
			raise Http404

class CommunityAdvertiserCreate(View):
	def get(self,request,*args,**kwargs):
		community, user = Community.objects.get(pk=self.kwargs["community_pk"]), User.objects.get(pk=self.kwargs["user_pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(self.community.pk):
			new_advertiser = self.community.add_advertiser(self.user)
			return HttpResponse()
		else:
			raise Http404
class CommunityAdvertiserDelete(View):
	def get(self,request,*args,**kwargs):
		community, user = Community.objects.get(pk=self.kwargs["community_pk"]), User.objects.get(pk=self.kwargs["user_pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(self.community.pk):
			new_advertiser = self.community.remove_advertiser(self.user)
			return HttpResponse()
		else:
			raise Http404


class CommunityBannedCreate(View):
	def get(self,request,*args,**kwargs):
		community, user = Community.objects.get(pk=self.kwargs["community_pk"]), User.objects.get(pk=self.kwargs["user_pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(self.community.pk):
			new_advertiser = self.community.create_banned_user(self.user)
			return HttpResponse()
		else:
			raise Http404
class CommunityBannedDelete(View):
	def get(self,request,*args,**kwargs):
		community, user = Community.objects.get(pk=self.kwargs["community_pk"]), User.objects.get(pk=self.kwargs["user+pk"])
		if request.is_ajax() and request.user.is_administrator_of_community(self.community.pk):
			new_advertiser = self.community.delete_banned_user(self.user)
			return HttpResponse()
		else:
			raise Http404
