from typing import List

import pytest

from models import ToDo, Project


@pytest.fixture
def project() -> Project:
    return Project.objects.first()


@pytest.fixture
def projects_todos(project: Project) -> List[ToDo]:
    pass
