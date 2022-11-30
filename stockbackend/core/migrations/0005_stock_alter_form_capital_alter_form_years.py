# Generated by Django 4.1.3 on 2022-11-30 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_form_capital_alter_form_years'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stockName', models.TextField(max_length=30)),
                ('ticker', models.TextField(max_length=30)),
                ('price', models.TextField(max_length=30)),
                ('valuation', models.TextField(max_length=30)),
            ],
        ),
        migrations.AlterField(
            model_name='form',
            name='capital',
            field=models.TextField(max_length=10),
        ),
        migrations.AlterField(
            model_name='form',
            name='years',
            field=models.TextField(max_length=2),
        ),
    ]