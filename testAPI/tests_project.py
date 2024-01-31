import pytest

from todoapp.models import Project

# - Написать и протестировать метод модели Project, который выводит список имен всех участников проекта, для случаев:
#   + в проекте есть пользователи с именами
#   + не у всех пользователей проекта есть имена
#   + в проекте нет пользователей
@pytest.mark.django_db
def test_get_project_team(
        project: Project
):
    names = project.get_project_team()
    assert names != []