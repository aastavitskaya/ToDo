import graphene
from graphene_django import DjangoObjectType

from authapp.models import CustomUser
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


class ToDoInput(graphene.InputObjectType):
    project = graphene.ID(required=True)
    user = graphene.ID(required=True)
    body = graphene.String(required=True)


class ToDoCreate(graphene.Mutation):
    class Arguments:
       todo_data = ToDoInput(required=True)

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, todo_data=None):
        todo = ToDoType(
            project = todo_data.project,
            user = todo_data.user,
            body = todo_data.body
        )
        return ToDoCreate(todo=todo)


class Mutation(graphene.ObjectType):
    create_todo = ToDoCreate.Field()


class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)
    all_todo = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    user_by_id = graphene.Field(CustomUserType, id=graphene.Int(required=True))
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
