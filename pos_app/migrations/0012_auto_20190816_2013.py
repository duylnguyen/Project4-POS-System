# Generated by Django 2.2.4 on 2019-08-16 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pos_app', '0011_auto_20190816_1949'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='menu_items',
        ),
        migrations.AddField(
            model_name='menu',
            name='tickets',
            field=models.ManyToManyField(blank=True, related_name='menu_items', to='pos_app.Ticket'),
        ),
    ]
