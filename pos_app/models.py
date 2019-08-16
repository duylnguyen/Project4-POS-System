from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    phone = models.CharField(max_length=128)

    def __str__(self):
        return self.first_name

class Menu(models.Model):
    menu_type = models.CharField(max_length=128)
    name = models.CharField(max_length=128)
    price = models.IntegerField(default=0)

    def __str__(self):
        return self.menu_type

class Ticket(models.Model):
    table_number = models.CharField(max_length=128, default='')
    open_time = models.DateTimeField(auto_now=True)
    close_time = models.DateTimeField(auto_now=True)
    open_ticket = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets', blank=True)
    menu_items = models.ManyToManyField(Menu, related_name='tickets', blank=True)

    def __str__(self):
        return str(self.id)




