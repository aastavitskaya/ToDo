from rest_framework.serializers import HyperlinkedModelSerializer

from todoapp.models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = [
            "project_name",
            "link_to_repo",
            "description",
            "project_team",
        ]
        
class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = [
            "project",
            "user",
            "body",
            "is_active",
        ]