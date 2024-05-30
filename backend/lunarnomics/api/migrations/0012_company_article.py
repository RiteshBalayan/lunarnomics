# Generated by Django 5.0.4 on 2024-05-08 23:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_project_start_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='article',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='article_Company', to='api.article'),
        ),
    ]
