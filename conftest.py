from typing import Tuple, List

import pytest

from django.core.management import call_command
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from mixer.backend.django import mixer

from authapp.models import CustomUser
from todoapp.models import Project


TEST_USER = 'test_user@mail.ru'
ADMIN_EMAIL = 'test_admin@mail.ru'
TEST_PASSWORD = 'password'
USERS_COUNT = 12


@pytest.fixture(scope='session')  # function, class, module, package, session
def django_db_setup(django_db_setup, django_db_blocker):

    with django_db_blocker.unblock():
        call_command('loaddata', 'bd.json')


@pytest.fixture
def anon_client() -> APIClient:
    return APIClient()


@pytest.fixture
def user() -> CustomUser:
    test_user = CustomUser.objects.create_user(email=TEST_USER, password=TEST_PASSWORD)
    return test_user


@pytest.fixture
def admin() -> CustomUser:
    test_admin = CustomUser.objects.create_superuser(email=ADMIN_EMAIL, password=TEST_PASSWORD, is_superuser=True, is_staff=True)
    return test_admin


@pytest.fixture
def client(user: 'CustomUser', anon_client: 'APIClient') -> Tuple[CustomUser, APIClient]:

    anon_client.force_authenticate(user)   # авторизация для апишек DRF

    anon_client.force_login(user)          # авторизация для вьюшек Django

    refresh = RefreshToken.for_user(user)  # авторизация по JWT-токену
    anon_client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    return user, anon_client


@pytest.fixture
def admin_client(admin: 'CustomUser', anon_client: 'APIClient') -> Tuple[CustomUser, APIClient]:
    anon_client.force_authenticate(admin)

    refresh = RefreshToken.for_user(admin)
    anon_client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    return admin, anon_client


@pytest.fixture
def user_with_password(user: CustomUser):
    user.set_password(TEST_PASSWORD)
    user.save()
    return user


@pytest.fixture
def random_users() -> List[CustomUser]:
    users = []
    for i in range(12):
        email = f'super_new_user{i}@mail.ru'
        user = CustomUser.objects.create(email=email, password=TEST_PASSWORD)
        users.append(user)
    return users

# @pytest.fixture
# def project() -> Project:
#     return Project.objects.first()

@pytest.fixture
def project():
    project = mixer.blend(Project)
    return project
