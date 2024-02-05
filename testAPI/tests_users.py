import pytest

from authapp.models import CustomUser


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
    super_new_user = CustomUser.objects.filter(email__contains='super_new_user')
    new_users_count = super_new_user.count()
    assert len(random_users) == new_users_count


@pytest.mark.django_db
def test_user_auth(random_users, anon_client):
    for user in random_users:
        anon_client.login(email=user.email, password=PASSWORD)
        response = anon_client.get(USERS_API_URL)
        assert response.status_code == 200
        anon_client.logout()


@pytest.mark.django_db
def test_delete_users(random_users):
    CustomUser.objects.filter(email__contains='super_new_user').delete()
    assert CustomUser.objects.filter(email__contains='super_new_user') not in CustomUser.objects.all()