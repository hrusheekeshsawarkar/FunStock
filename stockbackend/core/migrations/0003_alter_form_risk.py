# Generated by Django 4.1.3 on 2022-11-30 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_form_delete_react'),
    ]

    operations = [
        migrations.AlterField(
            model_name='form',
            name='risk',
            field=models.TextField(max_length=8),
        ),
    ]
