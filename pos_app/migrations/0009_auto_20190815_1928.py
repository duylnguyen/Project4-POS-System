# Generated by Django 2.2.4 on 2019-08-15 19:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pos_app', '0008_auto_20190815_1912'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='menu_items',
            field=models.ManyToManyField(blank=True, related_name='tickets', to='pos_app.Menu'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='pos_app.User'),
        ),
    ]
