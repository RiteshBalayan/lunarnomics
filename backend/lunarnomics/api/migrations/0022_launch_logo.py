# Generated by Django 5.0.4 on 2024-05-16 03:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_project_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='launch',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='launch_logo/'),
        ),
    ]
