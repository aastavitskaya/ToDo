import pytest

from typing import Tuple
from rest_framework import status
from authapp.models import CustomUser
from rest_framework.test import APIClient

PASSWORD = 'password'
INCORRECT_PASSWORD = 'incorrect_password'
USERS_API_URL = '/api/users/'

# Протестировать API users следующим образом:
#   + сгенерировать несколько случайный новых пользователей
#   + проверить в БД кол-во созданных пользователей
#   + проверить возможность авторизации для каждого созданного пользователя
#   + удалить всех созданных пользователей


@pytest.mark.django_db
def test_get_users(random_users):
    new_users_count = CustomUser.objects.filter(email__contains='super_new_user').count()
    assert len(random_users) == new_users_count
    CustomUser.objects.filter(email__contains='super_new_user').delete()


@pytest.mark.django_db
def test_user_auth(random_users, anon_client):
    for user in random_users:
        anon_client.login(email=user.email, password=PASSWORD)
        response = anon_client.get(USERS_API_URL)
        assert response.status_code == 200
        anon_client.logout()


# @pytest.mark.django_db
# def test_auth_using_login_pass(anon_client: 'APIClient', user_with_password: 'CustomUser'):
#     anon_client.logout()
#     email = user_with_password.email
#     response = anon_client.post(
#         '/api-auth/login/',
#         data={'email': email, 'password': INCORRECT_PASSWORD},
#     )
#     assert response.status_code == 200
#

# @pytest.mark.django_db
# def test_users_create(
#         user: CustomUser,
#         admin_client: Tuple[CustomUser, APIClient],
# ):
#     _, admin = admin_client
#
#     users_count = CustomUser.objects.count()
#
#     new_user_email = 'new_user@mail.ru'
#     expected_user = CustomUser.objects.filter(email=new_user_email).first()
#
#     assert not expected_user
#
#     user_data = {
#         'email': 'new_user@mail.ru',
#         'password': PASSWORD,
#     }
#
#     response = admin.post(
#         USERS_API_URL,
#         data=user_data,
#         format='json',
#     )
#
#     assert response.status_code == status.HTTP_201_CREATED
#     assert CustomUser.objects.count() == users_count + 1
#
#     users_list = CustomUser.objects.values_list('email', flat=True)
#     new_user = CustomUser.objects.last()
#
#     assert new_user_email in users_list
#     assert new_user.email == new_user_email
#
#     new_user.delete()
#
#     assert new_user_email not in users_list
