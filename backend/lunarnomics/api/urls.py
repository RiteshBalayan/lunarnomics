from django.urls import path
from .views import NewsStoryListView, NewsStoryDetailView, CompanyListView,CompanyDetailView, ProjectListView, ProjectDetailView, LaunchDetailView, LaunchListView
from .views import ArticleListView, ArticleDetailView, ArticleGeneralListView, ArticleCapitalListView, CapitalDetailView

urlpatterns = [
    path('news/', NewsStoryListView.as_view(), name='news-list'),
    path('news/<int:pk>/', NewsStoryDetailView.as_view(), name='news-detail'),
    path('company/', CompanyListView.as_view(), name='company-list'),
    path('company/<int:pk>', CompanyDetailView.as_view(), name='company-detail'),
    path('project/', ProjectListView.as_view(), name='project-list'),
    path('project/<int:pk>', ProjectDetailView.as_view(), name='project-detail'),
    path('launch/', LaunchListView.as_view(), name='launch-list'),
    path('launch/<int:pk>', LaunchDetailView.as_view(), name='launch-detail'),
    path('article/', ArticleListView.as_view(), name='article-list'),
    path('article/<int:pk>', ArticleDetailView.as_view(), name='article-detail'),
    path('article/general/', ArticleGeneralListView.as_view(), name='article-general-list'),
    path('article/capital/', ArticleCapitalListView.as_view(), name='article-capital-list'),
    path('capital/<int:pk>', CapitalDetailView.as_view(), name='capital-detail'),
]