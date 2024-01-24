from django.test import TestCase

from authapp.models import CustomUser
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APISimpleTestCase, APITestCase, force_authenticate
from mixer.backend.django import mixer

from authapp.views import CustomUserModelViewSet
from todoapp.models import Project


class TestUserViewSet(TestCase):

    def setUp(self):
        self.url = "/api/users"
        self.password = "admin"
        self.email = "admin@mail.ru"

        self.admin = CustomUser.objects.create_superuser(email=self.email, password=self.password)
        self.data = {"email": "email@email.ru", "password": "password", "first_name": "Иван"}

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)

        view = CustomUserModelViewSet.as_view({'get': 'list'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        client = APIClient()
        user = CustomUser.objects.create_user(**self.data)
        response = client.get(f'{self.url}/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectViewSet(APITestCase):
    def setUp(self):
        self.password = "admin"
        self.email = "admin@mail.ru"
        self.url = "/api/projects/"
        self.data_user = {"email": "ivan@email.ru", "password": "password", "first_name": "Иван"}
        self.admin = CustomUser.objects.create_superuser(email=self.email, password=self.password)
        self.user = CustomUser.objects.create_user(**self.data_user)
        self.data = {"project_name": "ProjectP", "project_team": self.admin}
        self.data_put = {"project_name": "NewProject", "project_team": self.user}

    def test_get_list(self):
        self.client.login(email=self.email, password=self.password)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_mixer(self):
        project = mixer.blend(Project)
        self.client.login(email=self.email, password=self.password)
        response = self.client.put(f'{self.url}/{project.id}/', {"description": "new_text"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

