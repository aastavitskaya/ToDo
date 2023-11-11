from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import IntegrityError


class Command(BaseCommand):
    help = 'Create super user and test users'
    
    def handle(self, *args, **options):

        User = get_user_model()
        try:
            User.objects.create_superuser('admin@mail.ru', 'admin')
        
            for i in range(1, 3):
                email = f'user{i}@user.ru'
                password = f'1234{i}'
                user = User.objects.create(email=email)
                user.set_password(password)
                user.save()
        except IntegrityError:
            print("🙌 Упс, пользователь с email {email} уже есть")
