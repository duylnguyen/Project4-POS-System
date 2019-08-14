from django.contrib import admin
from .models import User, Ticket, Menu

admin.site.register([User, Ticket, Menu])
