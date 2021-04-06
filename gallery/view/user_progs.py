from users.models import User
from gallery.models import Album, Photo
from gallery.forms import AlbumForm
from django.http import HttpResponse, HttpResponseBadRequest
from django.views import View
from users.models import User
from django.http import Http404
from common.utils import render_for_platform
from django.views.generic.base import TemplateView
from common.utils import get_small_template


class UserAlbumAdd(View):
    def get(self,request,*args,**kwargs):
        list = Album.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and list.is_user_can_add_list(request.user.pk):
            list.users.add(request.user)
        return HttpResponse()

class UserAlbumRemove(View):
    def get(self,request,*args,**kwargs):
        list = Album.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and list.is_user_can_delete_list(request.user.pk):
            list.users.remove(request.user)
        return HttpResponse()


class PhotoAlbumUserCreate(View):
    """
    асинхронная мульти загрузка фотографий пользователя в альбом
    """
    def post(self, request, *args, **kwargs):
        _album = Album.objects.get(pk=self.kwargs["pk"])
        photos = []
        uploaded_file = request.FILES['file']
        if request.is_ajax():
            for p in request.FILES.getlist('file'):
                photo = Photo.objects.create(file=p, preview=p, creator=request.user, type="PUB")
                _album.photo_album.add(photo)
                photos += [photo,]
            return render_for_platform(request, 'user_gallery/new_album_photos.html',{'object_list': photos, 'album': _album, 'user': request.user})
        else:
            raise Http404

class PhotoAttachUserCreate(View):
    """
    мульти сохранение изображений с моментальным выводом в превью
    """
    def post(self, request, *args, **kwargs):
        photos = []
        if request.is_ajax():
            try:
                _album = Album.objects.get(creator=request.user, type=Album.WALL)
            except:
                _album = Album.objects.create(creator=request.user, type=Album.WALL, title="Фото со стены", description="Фото со стены")
            for p in request.FILES.getlist('file'):
                photo = Photo.objects.create(file=p, preview=p, creator=request.user, type="PUB")
                _album.photo_album.add(photo)
                photos += [photo,]
            return render_for_platform(request, 'user_gallery/new_album_photos.html',{'object_list': photos, 'user': request.user})
        else:
            raise Http404

class UserPhotoDelete(View):
    def get(self,request,*args,**kwargs):
        photo = Photo.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and photo.creator == request.user:
            photo.delete_photo()
            return HttpResponse()
        else:
            raise Http404

class UserPhotoAbortDelete(View):
    def get(self,request,*args,**kwargs):
        photo = Photo.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and photo.creator == request.user:
            photo.abort_delete_photo()
            return HttpResponse()
        else:
            raise Http404

class UserOnPrivatePhoto(View):
    def get(self,request,*args,**kwargs):
        photo = Photo.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and photo.creator == request.user:
            photo.type = "PRI"
            photo.save(update_fields=['type'])
            return HttpResponse()
        else:
            raise Http404

class UserOffPrivatePhoto(View):
    def get(self,request,*args,**kwargs):
        photo = Photo.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and photo.creator == request.user:
            photo.type = "PUB"
            photo.save(update_fields=['type'])
            return HttpResponse()
        else:
            raise Http404


class AlbumUserCreate(TemplateView):
    template_name = None
    form = None

    def get(self,request,*args,**kwargs):
        self.form = AlbumForm()
        self.template_name = get_small_template("user_gallery/add_album.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(AlbumUserCreate,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AlbumUserCreate,self).get_context_data(**kwargs)
        context["form"] = self.form
        return context

    def post(self,request,*args,**kwargs):
        self.form = AlbumForm(request.POST)
        if request.is_ajax() and self.form.is_valid():
            album = self.form.save(commit=False)
            if not album.description:
                album.description = "Без описания"
            if request.POST.get("is_public"):
                album.type = Album.ALBUM
            else:
                album.type = Album.PRIVATE
            new_album = Album.objects.create(title=album.title, description=album.description, type=album.type, order=album.order, creator=request.user)
            return render_for_platform(request, 'user_gallery/new_album.html',{'album': new_album})
        else:
            return HttpResponseBadRequest()
        return super(AlbumUserCreate,self).get(request,*args,**kwargs)

class AlbumUserEdit(TemplateView):
    template_name = None
    form=None

    def get(self,request,*args,**kwargs):
        self.template_name = get_small_template("user_gallery/edit_album.html", request.user, request.META['HTTP_USER_AGENT'])
        return super(AlbumUserEdit,self).get(request,*args,**kwargs)

    def get_context_data(self,**kwargs):
        context = super(AlbumUserEdit,self).get_context_data(**kwargs)
        context["form"] = self.form
        context["user"] = self.user
        context["album"] = Album.objects.get(uuid=self.kwargs["uuid"])
        return context

    def post(self,request,*args,**kwargs):
        self.album = Album.objects.get(uuid=self.kwargs["uuid"])
        self.form = AlbumForm(request.POST,instance=self.album)
        if request.is_ajax() and self.form.is_valid() and request.user.pk == album.creator.pk:
            album = self.form.save(commit=False)
            if not album.description:
                album.description = "Без описания"
            if request.POST.get("is_public"):
                album.type = Album.ALBUM
            else:
                album.type = Album.PRIVATE
            self.form.save()
            return HttpResponse()
        else:
            return HttpResponseBadRequest()
        return super(AlbumUserEdit,self).get(request,*args,**kwargs)

class AlbumUserDelete(View):
    def get(self,request,*args,**kwargs):
        album = Album.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and album.type != Album.WALL:
            album.type = "DEL"
            album.save(update_fields=['type'])
            return HttpResponse()
        else:
            raise Http404

class AlbumUserAbortDelete(View):
    def get(self,request,*args,**kwargs):
        album = Album.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax():
            album.type = "PUB"
            album.save(update_fields=['type'])
            return HttpResponse()
        else:
            raise Http404


class UserPhotoAlbumAdd(View):
    """
    Добавляем фото в любой альбом, если его там нет
    """
    def get(self, request, *args, **kwargs):
        photo = Photo.objects.get(pk=self.kwargs["pk"])
        album = Album.objects.get(uuid=self.kwargs["uuid"])

        if request.is_ajax() and not album.is_photo_in_album(photo.pk):
            album.photo_album.add(photo)
            return HttpResponse()
        else:
            raise Http404

class UserPhotoAlbumRemove(View):
    """
    Удаляем фото из любого альбома, если он там есть
    """
    def get(self, request, *args, **kwargs):
        photo = Photo.objects.get(pk=self.kwargs["pk"])
        album = Album.objects.get(uuid=self.kwargs["uuid"])
        if request.is_ajax() and album.is_photo_in_album(photo.pk):
            album.photo_album.remove(photo)
            return HttpResponse()
        else:
            raise Http404
