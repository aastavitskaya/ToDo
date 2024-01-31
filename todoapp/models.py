from django.db import models

from authapp import models as authapp_models


class Project(models.Model):
    project_name = models.CharField(max_length=256)
    link_to_repo = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    project_team = models.ManyToManyField(authapp_models.CustomUser, blank=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.project_name}"

    def get_project_team(self):
        project_team = self.project_team.all()
        names = []
        for user in project_team:
            if user.first_name:
                names.append(user.first_name)
        return names


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(authapp_models.CustomUser, on_delete=models.CASCADE)
    body = models.TextField(blank=False)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} on {self.project} at {self.created}"
