from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    phone = models.CharField(max_length=128)

    def __str__(self):
        return self.first_name

class Ticket(models.Model):
    open_time = models.DateTimeField(auto_now=True)
    close_time = models.DateTimeField(auto_now=True)
    open_ticket = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets')

    def __str__(self):
        return str(self.id)

class Menu(models.Model):
    menu_type = models.CharField(max_length=128)
    name = models.CharField(max_length=128)
    price = models.IntegerField(default=0)
    tickets = models.ManyToManyField(Ticket, related_name='menu_items')

    def __str__(self):
        return self.menu_type


