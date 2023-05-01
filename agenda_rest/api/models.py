from django.db import models

class Contato(models.Model):
    nome = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    telefone = models.CharField(max_length=15)
    data_nascimento = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.nome
