import pytest
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from authapp.models import CustomUser
    from rest_framework.test import APIClient

from conftest import TEST_PASSWORD

INCORRECT_PASSWORD = 'incorrect_password'
EXPECTED_REDIRECT_URL = '/accounts/profile/'


@pytest.mark.django_db
def test_auth_using_login_pass(anon_client: 'APIClient', user_with_password: 'CustomUser'):
    anon_client.logout()
    email = user_with_password.email
    response = anon_client.post(
        '/api-auth/login/',
        data={'email': email, 'password': INCORRECT_PASSWORD},
    )
    assert response.status_code == 200


