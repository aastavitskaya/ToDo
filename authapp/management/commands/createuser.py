from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Create super user and test users from fixture 001.json'

    def handle(self, *args, **options):
        call_command('loaddata', '001.json')
        