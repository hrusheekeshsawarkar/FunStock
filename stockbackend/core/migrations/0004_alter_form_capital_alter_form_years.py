# Generated by Django 4.1.3 on 2022-11-30 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_form_risk'),
    ]

    operations = [
        migrations.AlterField(
            model_name='form',
            name='capital',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='form',
            name='years',
            field=models.TextField(),
        ),
    ]
