from django.contrib import admin

from backend.authapp import models as authapp_models


@admin.register(authapp_models.CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("email", "first_name", "last_name", "password")