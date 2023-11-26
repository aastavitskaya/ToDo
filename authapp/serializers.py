from django.contrib.auth.hashers import make_password
from rest_framework.serializers import HyperlinkedModelSerializer

from authapp.models import CustomUser


class CustomUserModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = CustomUser
        fields = [
            "password",
            "first_name",
            "last_name",
            "email",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data["password"] = make_password(password)
        return super().create(validated_data)
