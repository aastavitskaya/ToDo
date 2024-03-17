from django.contrib.auth.hashers import make_password
from rest_framework.serializers import HyperlinkedModelSerializer

from backend.authapp.models import CustomUser


class CustomUserModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "url",
            "password",
            "first_name",
            "last_name",
            "email",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data["password"] = make_password(password)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        password = validated_data.get("password")
        if password:
            validated_data["password"] = make_password(password)
        return super().update(instance, validated_data)


class NewCustomUserModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "url",
            "password",
            "first_name",
            "last_name",
            "email",
            "is_staff",
            "is_superuser",
        ]
