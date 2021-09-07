from django.db import models
from django.conf import settings
from blog.models import Blog, ElectNew
from common.model.comments import ElectNewComment, BlogComment


"""
    Группируем все таблицы реакций здесь:
    1. Реакции на статьи блога проекта,
    2. Реакции на новостей чиновника,
    3. Реакции на комменты к новостям чиновника,
    4. Реакции на статьи блога
"""

class BlogVotes(models.Model):
    LIKE = "LIK"
    DISLIKE = "DIS"
    INERT = "INE"
    VOTES = ((DISLIKE, 'Не оценил'),(LIKE, 'Оценил'),(INERT, 'Объект инертный'))

    vote = models.CharField(max_length=5, verbose_name="Голос", choices=VOTES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Пользователь")
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)

class ElectNewVotes2(models.Model):
    LIKE = "LIK"
    DISLIKE = "DIS"
    INERT = "INE"
    VOTES = ((DISLIKE, 'Не оценил'),(LIKE, 'Оценил'),(INERT, 'Объект инертный'))

    vote = models.CharField(max_length=5, verbose_name="Голос", choices=VOTES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Пользователь")
    new = models.ForeignKey(ElectNew, on_delete=models.CASCADE)


class CommunityVotes(models.Model):
    LIKE = "LIK"
    DISLIKE = "DIS"
    INERT = "INE"
    VOTES = ((DISLIKE, 'Не оценил'),(LIKE, 'Оценил'),(INERT, 'Объект инертный'))

    vote = models.CharField(max_length=5, verbose_name="Голос", choices=VOTES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Пользователь")
    community = models.ForeignKey("communities.Community", on_delete=models.CASCADE)

class ElectVotes(models.Model):
    LIKE = "LIK"
    DISLIKE = "DIS"
    INERT = "INE"
    VOTES = ((DISLIKE, 'Не оценил'),(LIKE, 'Оценил'),(INERT, 'Объект инертный'))

    vote = models.CharField(max_length=5, verbose_name="Голос", choices=VOTES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Пользователь")
    elect = models.ForeignKey("elect.Elect", on_delete=models.CASCADE)


class ElectNewCommentVotes(models.Model):
    LIKE = 1
    VOTES = ((LIKE, 'Нравится'),)

    vote = models.IntegerField(default=0, verbose_name="Голос", choices=VOTES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Пользователь")
    comment = models.ForeignKey(ElectNewComment, on_delete=models.CASCADE)

class BlogCommentVotes(models.Model):
    LIKE = 1
    VOTES = ((LIKE, 'Нравится'),)

    vote = models.IntegerField(verbose_name="Голос", choices=VOTES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Пользователь")
    comment = models.ForeignKey(BlogComment, on_delete=models.CASCADE)

class OrganizationCommentVotes(models.Model):
    LIKE = 1
    VOTES = ((LIKE, 'Нравится'),)

    vote = models.IntegerField(verbose_name="Голос", choices=VOTES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Пользователь")
    comment = models.ForeignKey(BlogComment, on_delete=models.CASCADE)


class ElectRating(models.Model):
    MINUS_5 = -5
    MINUS_4 = -4
    MINUS_3 = -3
    MINUS_2 = -2
    MINUS_1 = -1
    ZERO = 0
    PLUS_1 = 1
    PLUS_2 = 2
    PLUS_3 = 3
    PLUS_4 = 4
    PLUS_5 = 5
    VOTES = (
                (MINUS_5, '#F8696B'),
                (MINUS_4, '#F98370'),
                (MINUS_3, '#FA9D75'),
                (MINUS_2, '#FCB77A'),
                (MINUS_1, '#FDD17F'),
                (ZERO, '#FFEB84'),
                (PLUS_1, '#E0E383'),
                (PLUS_2, '#C1DA81'),
                (PLUS_3, '#A2D07F'),
                (PLUS_4, '#83C77D'),
                (PLUS_5, '#63BE7B'),
            )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Пользователь")
    elect = models.ForeignKey(Elect, on_delete=models.CASCADE)

    vakcine = models.SmallIntegerField(verbose_name="Добровольность вакцинации", choices=VOTES)
    pp_825 = models.SmallIntegerField(verbose_name="Отмена пп 825", choices=VOTES)
    safe_family = models.SmallIntegerField(verbose_name="Защита прав семьи", choices=VOTES)
    pro_life = models.SmallIntegerField(verbose_name="Защита жизни с момента зачатия", choices=VOTES)
    free_vacation = models.SmallIntegerField(verbose_name="Свобода образования", choices=VOTES)
