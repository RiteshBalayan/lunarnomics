# Generated by Django 4.2.2 on 2024-06-01 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_alter_capitaltocomapny_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='type',
            field=models.CharField(blank=True, choices=[('private', 'private'), ('government', 'government'), ('nonprofit', 'nonprofit'), ('collaboration', 'collaboration'), ('investor', 'investor')], max_length=20),
        ),
    ]
