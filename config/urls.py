from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from authapp.views import CustomUserModelViewSet, WhoAmIView
from todoapp.views import ProjectModelViewSet, ToDoModelViewSet

router = DefaultRouter()
router.register("users", CustomUserModelViewSet)
router.register("projects", ProjectModelViewSet)
router.register("todo", ToDoModelViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    path ("who-am-i/", WhoAmIView.as_view(), name="Who am I?"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
    path('api-token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
