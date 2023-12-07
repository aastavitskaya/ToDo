from rest_framework.serializers import ModelSerializer, SerializerMethodField
from todoapp.models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "project_name",
            "link_to_repo",
            "description",
            "project_team",
        ]


class ToDoModelSerializer(ModelSerializer):
    formatted_date = SerializerMethodField()

    class Meta:
        model = ToDo
        fields = [
            "id",
            "project",
            "user",
            "body",
            "is_active",
            "formatted_date",
            "created",
            "deleted"
        ]
    def get_formatted_date(self, obj):
        return obj.created.strftime("%d.%m.%Y %H:%M:%S")
