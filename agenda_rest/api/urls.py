from django.urls import path
from .views import listar_contatos_paginados, lista_contatos, detalhes_contato, cria_contato
urlpatterns = [
    path('contatos/', lista_contatos, name='lista_contatos'),
    path('contatos/page/<int:page>/', listar_contatos_paginados, name='listar_contatos_paginados'),
    path('contatos/<int:pk>/', detalhes_contato, name='detalhes_contato'),
    path('contatos/criar/', cria_contato, name='cria_contato'),
]
