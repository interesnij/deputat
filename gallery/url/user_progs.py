from gallery.view.user_progs import *
from django.conf.urls import url


urlpatterns=[
    url(r'^delete/(?P<uuid>[0-9a-f-]+)/$', UserPhotoDelete.as_view()),
    url(r'^abort_delete/(?P<uuid>[0-9a-f-]+)/$', UserPhotoAbortDelete.as_view()),
    url(r'^on_private/(?P<uuid>[0-9a-f-]+)/$', UserOnPrivatePhoto.as_view()),
    url(r'^off_private/(?P<uuid>[0-9a-f-]+)/$', UserOffPrivatePhoto.as_view()),

    url(r'^add_photo/(?P<uuid>[0-9a-f-]+)/$', PhotoAlbumUserCreate.as_view()),
    url(r'^add_attach_photo/$', PhotoAttachUserCreate.as_view()),

    url(r'^add_album/$', AlbumUserCreate.as_view()),
    url(r'^edit_album/(?P<uuid>[0-9a-f-]+)/$', AlbumUserEdit.as_view(), name="photo_album_edit_user"),
    url(r'^delete_album/(?P<uuid>[0-9a-f-]+)/$', AlbumUserDelete.as_view()),
    url(r'^abort_delete_album/(?P<uuid>[0-9a-f-]+)/$', AlbumUserAbortDelete.as_view()),

    url(r'^add_photo_in_list/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', UserPhotoAlbumAdd.as_view()),
    url(r'^remove_photo_from_list/(?P<pk>\d+)/(?P<uuid>[0-9a-f-]+)/$', UserPhotoAlbumRemove.as_view()),

    url(r'^add_list/(?P<pk>\d+)/$', UserAlbumAdd.as_view()),
    url(r'^remove_list/(?P<pk>\d+)/$', UserAlbumRemove.as_view()),
]
