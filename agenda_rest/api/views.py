from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status

from .models import Contato
from .serializers import ContatoSerializer


@csrf_exempt
def listar_contatos_paginados(request, page):
    contatos_list = Contato.objects.all()
    paginator = Paginator(contatos_list, 10)  # exibir 10 contatos por página

    contatos = paginator.get_page(page)
    serializer = ContatoSerializer(contatos, many=True)
    total_registros = paginator.count
    total_paginas = paginator.num_pages
    data = {
        'contatos': serializer.data,
        'pagina_atual': page,
        'total_registros': total_registros,
        'total_paginas': total_paginas,
    }
    return JsonResponse(data, status=status.HTTP_200_OK)


@csrf_exempt
def lista_contatos(request):
    if request.method == 'GET':
        contatos = Contato.objects.all()
        serializer = ContatoSerializer(contatos, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ContatoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def detalhes_contato(request, pk):
    try:
        contato = Contato.objects.get(pk=pk)
    except Contato.DoesNotExist:
        return JsonResponse({'message': 'O contato não existe'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContatoSerializer(contato)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ContatoSerializer(contato, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        contato.delete()
        return JsonResponse({'message': 'O contato foi deletado com sucesso'}, status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
def cria_contato(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ContatoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
