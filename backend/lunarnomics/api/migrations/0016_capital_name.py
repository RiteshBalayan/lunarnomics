# Generated by Django 5.0.4 on 2024-05-11 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_capital_article_alter_article_type_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='capital',
            name='name',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
