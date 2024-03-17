import graphene
from graphene_django import DjangoObjectType

from backend.authapp.models import CustomUser
from todoapp.models import Project, ToDo


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = "__all__"


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class TodoCreate(graphene.Mutation):
    class Arguments:
        project_id = graphene.Int(required=True)
        user_id = graphene.Int(required=True)
        body = graphene.String()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, project_id, user_id, body):
        project = Project.objects.get(pk=project_id)
        user = CustomUser.objects.get(pk=user_id)
        todo = ToDo.objects.create(project=project, user=user, body=body)
        todo.save()
        return TodoCreate(todo=todo)


class TodoUpdate(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        body = graphene.String()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, id, body):
        todo = ToDo.objects.get(pk=id)
        todo.body = body
        todo.save()
        return TodoUpdate(todo=todo)


class Mutation(graphene.ObjectType):
    todo_create = TodoCreate.Field()
    todo_update = TodoUpdate.Field()


class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)
    all_todo = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    user_by_id = graphene.Field(CustomUserType, id=graphene.Int(required=True))

    def resolve_all_users(self, info):
        return CustomUser.objects.all()

    def resolve_all_todo(self, info):
        return ToDo.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_user_by_id(self, info, id):
        try:
            return CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return None


schema = graphene.Schema(query=Query, mutation=Mutation)
