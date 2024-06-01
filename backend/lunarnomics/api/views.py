from rest_framework import generics
from .models import NewsStory, Company, Project, Launch, Article
from .serializers import NewsStorySerializer, NewsStorySerializerlist, CompanySerializer, ProjectSerializer, LaunchSerializer
from .serializers import ArticleSerializer, ArticleSerializerlist, ArticleSerializerCapitallist
from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class NewsStoryListView(generics.ListAPIView):
    queryset = NewsStory.objects.all()
    serializer_class = NewsStorySerializerlist
    pagination_class = CustomPageNumberPagination

class NewsStoryDetailView(generics.RetrieveAPIView):
    queryset = NewsStory.objects.all()
    serializer_class = NewsStorySerializer

class CompanyListView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyDetailView(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class LaunchListView(generics.ListAPIView):
    queryset = Launch.objects.all()
    serializer_class = LaunchSerializer

class LaunchDetailView(generics.RetrieveAPIView):
    queryset = Launch.objects.all()
    serializer_class = LaunchSerializer

class ArticleListView(generics.ListAPIView):
    queryset = Article.objects.filter(type__in=['launch', 'company','projects'])
    serializer_class = ArticleSerializerlist

class ArticleDetailView(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleGeneralListView(generics.ListAPIView):
    queryset = Article.objects.filter(type='general')
    serializer_class = ArticleSerializerlist
    pagination_class = CustomPageNumberPagination

class ArticleCapitalListView(generics.ListAPIView):
    queryset = Article.objects.filter(type='capital')
    serializer_class = ArticleSerializerCapitallist
    pagination_class = CustomPageNumberPagination