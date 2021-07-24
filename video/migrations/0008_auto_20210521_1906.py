# Generated by Django 3.2 on 2021-05-21 19:06

from django.db import migrations, models
import imagekit.models.fields
import video.helpers


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0007_auto_20210516_2007'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to=video.helpers.upload_to_video_directory, validators=[video.helpers.validate_file_extension], verbose_name='Видеозапись'),
        ),
        migrations.AlterField(
            model_name='video',
            name='image',
            field=imagekit.models.fields.ProcessedImageField(blank=True, null=True, upload_to=video.helpers.upload_to_video_directory, verbose_name='Обложка'),
        ),
        migrations.AlterField(
            model_name='video',
            name='uri',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Ссылка на видео'),
        ),
    ]