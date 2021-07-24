# Generated by Django 3.2 on 2021-05-13 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0021_auto_20210512_1632'),
    ]

    operations = [
        migrations.AlterField(
            model_name='electnew',
            name='status',
            field=models.CharField(choices=[('_PRO', 'Обработка'), ('PUB', 'Опубликовано'), ('_DEL', 'Удалено'), ('PRI', 'Приватно'), ('_CLO', 'Закрыто модератором'), ('MAN', 'Созданный персоналом'), ('_DELP', 'Удалённый приватный'), ('_DELM', 'Удалённый менеджерский'), ('_CLOP', 'Закрытый приватный'), ('_CLOM', 'Закрытый менеджерский')], default='_PRO', max_length=5, verbose_name='Статус записи'),
        ),
    ]