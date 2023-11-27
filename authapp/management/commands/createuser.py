from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import IntegrityError


class Command(BaseCommand):
    help = 'Create super user and test users'
    USERS_COUNT = 18

    def handle(self, *args, **options):

        User = get_user_model()
        for i in range(self.USERS_COUNT):
            user_create_fun = User.objects.create_superuser if i == 0 else User.objects.create_user
            email = 'admin@mail.ru' if i == 0 else f'user{i}@user.ru'
            password = 'admin' if i == 0 else f'1234{i}'
            try:
                user_create_fun(email, password)
            except IntegrityError:
                print(f'🙌 Упс, пользователь с email {email} уже есть')
