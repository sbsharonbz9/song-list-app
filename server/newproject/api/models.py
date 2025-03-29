from django.db import models

class Song(models.Model):
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=50)
    key = models.CharField(max_length=10)
    
    def __str__(self):
        return self.title
