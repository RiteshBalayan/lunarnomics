from rest_framework import serializers
from .models import NewsStory, Paragraph, Image, YoutubeEmbed, Reference, Company, Article, Launch, Project, Technology, Capital, People, CapitalToComapny, CapitalToProject

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = '__all__'

class ParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paragraph
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class YoutubeEmbedSerializer(serializers.ModelSerializer):
    class Meta:
        model = YoutubeEmbed
        fields = '__all__'

class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = '__all__'

class NewsStorySerializer(serializers.ModelSerializer):

    paragraphs = ParagraphSerializer(many=True, read_only=True)
    images = ImageSerializer(many=True, read_only=True)
    reference = ReferenceSerializer(many=True, read_only=True)

    class Meta:
        model = NewsStory
        fields = ('pk','title', 'subtitle', 'paragraphs', 'images', 'reference', 'publish_date', 'author_name', 'thumbnail')


class NewsStorySerializerlist(serializers.ModelSerializer):

    class Meta:
        model = NewsStory
        fields = ('pk','title', 'subtitle', 'publish_date', 'author_name', 'thumbnail')


class ArticleSerializer(serializers.ModelSerializer):

    paragraphs = ParagraphSerializer(many=True, read_only=True)
    images = ImageSerializer(many=True, read_only=True)
    video = YoutubeEmbedSerializer(many=True, read_only=True)
    reference = ReferenceSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = ('pk','title', 'type' ,'subtitle', 'paragraphs', 'images','video','reference', 'publish_date', 'author_name', 'thumbnail')

class ArticleSerializerlist(serializers.ModelSerializer):
    identity_number = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ('pk','identity_number','title', 'type' ,'subtitle', 'paragraphs', 'images', 'reference', 'publish_date', 'author_name', 'thumbnail')

    def get_identity_number(self, obj):
        related_models = [
            obj.article_Company.first(),
            obj.article_Project.first(),
            obj.article_Launch.first(),
        ]
        for related_model in related_models:
            if related_model:
                return related_model.id
        return None

class CompanySerializerInLine(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('__all__')

class CapitalInLine(serializers.ModelSerializer):
    capital_from = CompanySerializerInLine(many=True, read_only=True)

    class Meta:
        model = Capital
        fields = ('__all__')

        
class CapitalToComapnyInLine(serializers.ModelSerializer):

    parent_capital = serializers.SerializerMethodField()

    def get_parent_capital(self, obj):
        capitals = obj.capital_to_company_Capital.all()
        return CapitalInLine(capitals, many=True).data

    class Meta:
        model = CapitalToComapny
        fields = ('__all__')

class CapitalToProjectInLine(serializers.ModelSerializer):

    parent_capital = serializers.SerializerMethodField()

    def get_parent_capital(self, obj):
        capitals = obj.capital_to_project_Capital.all()
        return CapitalInLine(capitals, many=True).data

    class Meta:
        model = CapitalToProject
        fields = ('__all__')


class ProjectSerializerInLine(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'id','logo', 'objective', 'start_date')


class CapitalSerializer(serializers.ModelSerializer):
    capital_from = CompanySerializerInLine(many=True, read_only=True)
    capital_to_company = CompanySerializerInLine(many=True, read_only=True)
    capital_to_project = ProjectSerializerInLine(many=True, read_only=True)
    article = ArticleSerializer(read_only=True)
    parent_capital = CapitalInLine(many=True, read_only=True)
    daughter_capital = CapitalInLine(many=True, read_only=True)

    class Meta:
        model = Capital
        fields = ('__all__')


class ArticleSerializerCapitallist(serializers.ModelSerializer):
    
    capital = CapitalSerializer(source='article_Capital', read_only=True)

    def get_capital(self, obj):
        capitals = obj.article_Capital.all()
        return CapitalInLine(capitals, many=True).data

    class Meta:
        model = Article
        fields = ('pk','title', 'type' ,'subtitle', 'paragraphs', 'images', 'reference', 'publish_date', 'author_name', 'thumbnail', 'capital')


class PeopleSerializerInLine(serializers.ModelSerializer):

    class Meta:
        model = People
        fields = ('__all__')


class CompanySerializer(serializers.ModelSerializer):
    article = ArticleSerializer(read_only = True)
    parent_company = CompanySerializerInLine(many=True, read_only=True)
    daughter_company = CompanySerializerInLine(many=True, read_only=True)
    founder = PeopleSerializerInLine(many=True, read_only=True)
    capital = serializers.SerializerMethodField()

    def get_capital(self, obj):
        capitals = CapitalToComapny.objects.filter(name=obj)
        return CapitalToComapnyInLine(capitals, many=True).data
    
    class Meta:
        model = Company
        fields = ('__all__')


class ProjectSerializer(serializers.ModelSerializer):
    article = ArticleSerializer(read_only=True)
    parent_projects = ProjectSerializerInLine(many=True, read_only=True)
    daughter_projects = ProjectSerializerInLine(many=True, read_only=True)
    developers = CompanySerializerInLine(many=True, read_only=True)
    codevelopers = CompanySerializerInLine(many=True, read_only=True)
    capital = serializers.SerializerMethodField()

    def get_capital(self, obj):
        capitals = CapitalToProject.objects.filter(name=obj)
        return CapitalToProjectInLine(capitals, many=True).data

    class Meta:
        model = Project
        fields = ('name', 'id', 'logo', 'objective', 'start_date','capital','article', 'parent_projects', 'daughter_projects', 'developers', 'codevelopers', 'reference')




class LaunchSerializer(serializers.ModelSerializer):
    primary_owner = CompanySerializerInLine(many=True, read_only=True)
    secondary_owner = CompanySerializerInLine(many=True, read_only=True)
    article = ArticleSerializer(read_only=True)
    technology = TechnologySerializer(many=True, read_only=True)
    project = ProjectSerializerInLine(many=True, read_only=True)
    launch_serial_number = serializers.SerializerMethodField()
    total_launches = serializers.SerializerMethodField()

    class Meta:
        model = Launch
        fields = '__all__'

    def get_launch_serial_number(self, instance):
        # Assuming Launch objects have a unique identifier like id
        return instance.id
    
    def get_total_launches(self, instance):
        return Launch.objects.count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        launches = Launch.objects.all().order_by('-launch_date')

        # Assigning serial numbers based on sorted launch dates
        serial_numbers = {launch.id: index + 1 for index, launch in enumerate(launches)}

        # Adding serial number to representation
        representation['launch_serial_number'] = serial_numbers[instance.id]

        return representation