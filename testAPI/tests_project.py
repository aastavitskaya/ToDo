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

    user1 = mixer.blend(CustomUser, first_name='User1')
    user2 = mixer.blend(CustomUser, first_name='User2')
    user3 = mixer.blend(CustomUser, first_name='User3')
    project.project_team.add(user1, user2, user3)

    names = project.get_project_team()
    assert names != []
    assert names.count() == 3

    user2.first_name = ''
    user2.save()
    names2 = project.get_project_team()
    assert '' in names2

    project.project_team.clear()
    names3 = project.get_project_team()
    assert names3.count() == 0


@pytest.mark.django_db
def test_mocked_get_book(
        mocker,
        project: Project,
):
    mocked_method = mocker.patch.object(project, 'get_project_team', return_value='Hello my love!')
    project_team = project.get_project_team()
    mocked_method.assert_called_once()
    assert project_team == 'Hello my love!'
