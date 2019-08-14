from rest_framework import serializers

from .models import User, Ticket, Menu

class MenuSerializer(serializers.ModelSerializer):
    tickets = serializers.PrimaryKeyRelatedField(queryset=Menu.objects.all(), many=True)

    class Meta:
        model = Menu
        field = ('id', 'menu_type', 'name', 'price')

class TicketSerializer(serializers.ModelSerializer):
    menu_items = MenuSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ('id', 'ticket_number', 'open_time', 'close_time', 'open_ticket', 'menu_items')

class UserSerializer(serializers.ModelSerializer):
    tickets = TicketSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'phone', 'tickets')