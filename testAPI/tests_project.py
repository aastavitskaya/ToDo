import pytest

from mixer.backend.django import mixer

from todoapp.models import Project
from authapp.models import CustomUser

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
    assert names.count() == CustomUser.objects.filter(project=project).count()

    project.get_project_team().update(first_name="")
    names2 = project.get_project_team()
    assert not all(names2)

    project.project_team.clear()
    names3 = project.get_project_team()
    assert names3.count() == project.project_team.count()


@pytest.mark.django_db
def test_mocked_get_book(
        mocker,
        project: Project,
):
    mocked_method = mocker.patch.object(project, 'get_project_team', return_value='Hello my love!')
    project_team = project.get_project_team()
    mocked_method.assert_called_once()
    assert project_team == 'Hello my love!'
