from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.pagination import LimitOffsetPagination

from authapp.models import CustomUser
from authapp.serializers import CustomUserModelSerializer


class CustomUserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2


class CustomUserModelViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    pagination_class = CustomUserLimitOffsetPagination
