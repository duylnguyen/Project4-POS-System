# Generated by Django 2.2.4 on 2019-08-15 16:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pos_app', '0003_remove_ticket_ticket_number'),
    ]

    operations = [
        migrations.RenameField(
            model_name='menu',
            old_name='menu_type',
            new_name='type',
        ),
    ]
