# Generated by Django 5.0.4 on 2024-05-10 05:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_project_article_technology_article'),
    ]

    operations = [
        migrations.AddField(
            model_name='launch',
            name='status',
            field=models.CharField(blank=True, choices=[('completed', 'completed'), ('ongoing', 'ongoing'), ('planned', 'planned'), ('proposed', 'proposed')], max_length=100),
        ),
    ]