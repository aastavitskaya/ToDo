from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from authapp.models import CustomUser
from authapp.serializers import CustomUserModelSerializer, NewCustomUserModelSerializer


class CustomUserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 18


class CustomUserModelViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet,):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    pagination_class = CustomUserLimitOffsetPagination

    def get_serializer_class(self):
        print(self.request.version)
        if self.request.version == "2.0":
            return NewCustomUserModelSerializer
        return CustomUserModelSerializer

class WhoAmIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"id": request.user.id,
                         "firstName": request.user.first_name})
