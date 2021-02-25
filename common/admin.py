from django.contrib import admin
from common.model.other import *
from common.model.comments import *


class BlogCommentAdmin(admin.ModelAdmin):
    list_display = ['text','commenter','created']
    list_filter = ['created']
    search_fields = ['created','text','commenter']

    class Meta:
            model = BlogComment

class ElectNewCommentAdmin(admin.ModelAdmin):
    list_display = ['text','commenter','created']
    list_filter = ['created']
    search_fields = ['created','text','commenter']

    class Meta:
            model = ElectNewComment

class ElectCommentAdmin(admin.ModelAdmin):
    list_display = ['text','commenter','created']
    list_filter = ['created']
    search_fields = ['created','text','commenter']

    class Meta:
            model = ElectComment


admin.site.register(PhoneCodes)
admin.site.register(BlogComment, BlogCommentAdmin)
admin.site.register(ElectNewComment, ElectNewCommentAdmin)
admin.site.register(ElectComment, ElectCommentAdmin)

admin.site.register(BlogVotes)
admin.site.register(ElectNewVotes2)
admin.site.register(ElectNewCommentVotes)
admin.site.register(ElectCommentVotes)
admin.site.register(BlogCommentVotes)
