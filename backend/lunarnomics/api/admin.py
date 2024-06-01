from django.contrib import admin
from .models import Reference, Paragraph, Image, Article, NewsStory, Company, Project, Technology, Launch, Probe, CapitalToComapny, CapitalToProject, CapitalToTechnology, CapitalToProbe, CapitalToLaunch, Capital
from .models import NewsStory, Paragraph, Image, Reference, People
from django.contrib.admin.widgets import AdminFileWidget
from django.utils.html import format_html


class ParagraphInline(admin.TabularInline):
    model = Paragraph.paragraphs_NewsStory.through
    extra = 1

class ImageInline(admin.TabularInline):
    model = Image.images_NewsStory.through
    extra = 1

class ReferenceInline(admin.TabularInline):
    model = Reference.reference_NewsStory.through
    extra = 1

class NewsStoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'publish_date', 'author_name')
    list_filter = ('publish_date', 'author_name')
    search_fields = ('title', 'subtitle', 'author_name')

    fieldsets = (
        (None, {
            'fields': ('title', 'subtitle', 'author_name', 'thumbnail')
        }),
    )

    inlines = [ParagraphInline, ImageInline, ReferenceInline]

    #To make title and subtitle field type section longer
    def formfield_for_dbfield(self, db_field, **kwargs):
        formfield = super().formfield_for_dbfield(db_field, **kwargs)
        if db_field.name in ['title', 'subtitle']:
            formfield.widget.attrs['style'] = 'width: 100%;'  # Set width to 100% for title and subtitle fields
        return formfield
    
admin.site.register(NewsStory, NewsStoryAdmin)



class AParagraphInline(admin.TabularInline):
    model = Paragraph.paragraphs_Article.through
    extra = 1

class AImageInline(admin.TabularInline):
    model = Image.images_Article.through
    extra = 1

class AReferenceInline(admin.TabularInline):
    model = Reference.reference_Article.through
    extra = 1



class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'publish_date')
    list_filter = ('type','publish_date', 'author_name')
    search_fields = ('title', 'subtitle', 'author_name')
    fieldsets = (
        (None, {
            'fields': ('title', 'subtitle', 'type','author_name', 'thumbnail',"thumbnail_image")
        }),
    )
    inlines = [AParagraphInline, AImageInline, AReferenceInline]

    #To make title and subtitle field type section longer
    def formfield_for_dbfield(self, db_field, **kwargs):
        formfield = super().formfield_for_dbfield(db_field, **kwargs)
        if db_field.name in ['title', 'subtitle']:
            formfield.widget.attrs['style'] = 'width: 100%;'  # Set width to 100% for title and subtitle fields
        return formfield
    
    readonly_fields = [ "thumbnail_image"]

    def thumbnail_image(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.thumbnail.url,
            width=100,
            height=100,
            )
    )
    
admin.site.register(Article, ArticleAdmin)





class LaunchAdmin(admin.ModelAdmin):
    list_display = ('name', 'launch_date', 'status', 'launch_vehicle')
    list_filter = ('launch_date', 'launch_vehicle')
    search_fields = ('name', 'objective')
    filter_horizontal = ('primary_owner', 'secondary_owner', 'project', 'technology', 'reference')
    fieldsets = (
        (None, {
            'fields': ('name', 'status','logo','launch_date', 'mission_length', 'launch_vehicle', 'objective')
        }),
        ('Owners', {
            'fields': ('primary_owner', 'secondary_owner'),
            'classes': ('collapse',)  # Hide this section by default
        }),
        ('Project & Technology', {
            'fields': ('project', 'technology'),
            'classes': ('collapse',)  # Hide this section by default
        }),
        ('Related Article & References', {
            'fields': ('article', 'reference'),
            'classes': ('collapse',)  # Hide this section by default
        }),
    )

admin.site.register(Launch, LaunchAdmin)




'''
Folling inline command are to show inline realtion of projects developed by company,
As developer field are in Project field (Many to Many) 
'''
class CompanyDeveloperProjectInline(admin.TabularInline):
    model = Company.developers_Project.through
    verbose_name_plural = "Developers"
    extra = 0

class CompanyCodeveloperProjectInline(admin.TabularInline):
    model = Company.codevelopers_Project.through
    verbose_name_plural = "Codevelopers"
    extra = 0

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name','location', 'type', 'incorporation_date')
    list_filter = ('type', 'incorporation_date')
    search_fields = ('name', 'objective')
    filter_horizontal = ('parent_company', 'daughter_company', 'founder')
    fieldsets = (
        (None, {
            'fields': ('name', 'founder','location','logo', 'type', 'objective', 'incorporation_date', 'article')
        }),
        ('Hierarchy', {
            'fields': ('parent_company', 'daughter_company'),
            'classes': ('collapse',)  # Hide this section by default
        }),
        ('References', {
            'fields': ('reference',),
            'classes': ('collapse',)  # Hide this section by default
        }),
    )
    inlines = [CompanyDeveloperProjectInline,CompanyCodeveloperProjectInline]

admin.site.register(Company, CompanyAdmin)






from django.utils.safestring import mark_safe

class ProjectAdmin(admin.ModelAdmin):
    filter_horizontal = ('developers', 'codevelopers', 'parent_projects', 'daughter_projects')
    fieldsets = (
        (None, {
            'fields': ('name','logo','logo_image','objective', 'start_date', 'article', 'reference')
        }),
        ('developers', {
            'fields': ('developers', 'codevelopers'),
            'classes': ('collapse',)  # Hide this section by default
        }),
        ('related projects', {
            'fields': ('parent_projects','daughter_projects'),
            'classes': ('collapse',)  # Hide this section by default
        }),
    )


    readonly_fields = [ "logo_image"]

    def logo_image(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.logo.url,
            width=100,
            height=100,
            )
    )


    def formfield_for_dbfield(self, db_field, **kwargs):
        formfield = super().formfield_for_dbfield(db_field, **kwargs)
        if db_field.name in ['objective']:
            formfield.widget.attrs['style'] = 'width: 100%;'  # Set width to 100% for title and subtitle fields
        return formfield

admin.site.register(Project, ProjectAdmin)









class CapitalToComapnyInline(admin.TabularInline):
    model = Capital.capital_to_company.through
    extra = 0

class CapitalToProjectInline(admin.TabularInline):
    model = Capital.capital_to_project.through
    extra = 0

class CapitalToTechnologyInline(admin.TabularInline):
    model = Capital.capital_to_technology.through
    extra = 0

class CapitalToLaunchInline(admin.TabularInline):
    model = Capital.capital_to_launch.through
    extra = 0



class CapitalAdmin(admin.ModelAdmin):
    list_display = ('name','type','amount', 'date', 'status')
    list_filter = ('type', 'amount')
    search_fields = ('type', 'capital_from')
    filter_horizontal = ('capital_from',)
    fieldsets = (
        (None, {
            'fields': ('name','type', 'amount','date','status', 'capital_from')
        }),
        ('Articles and References', {
            'fields': ('article','reference',),
            'classes': ('collapse',)  # Hide this section by default
        }),
        ('related capital', {
            'fields': ('parent_capital','daughter_capital'),
            'classes': ('collapse',)  # Hide this section by default
        }),
    )
    inlines = [CapitalToComapnyInline, CapitalToProjectInline, CapitalToTechnologyInline, CapitalToLaunchInline]

        #To make title and subtitle field type section longer
    def formfield_for_dbfield(self, db_field, **kwargs):
        formfield = super().formfield_for_dbfield(db_field, **kwargs)
        if db_field.name in ['name', 'amount']:
            formfield.widget.attrs['style'] = 'width: 100%;'  # Set width to 100% for title and subtitle fields
        return formfield

admin.site.register(Capital, CapitalAdmin)

admin.site.register(Reference)
admin.site.register(Paragraph)
admin.site.register(Image)
#admin.site.register(Article)
#admin.site.register(NewsStory)
#admin.site.register(Company)
#admin.site.register(Project)
admin.site.register(Technology)
#admin.site.register(Launch)
admin.site.register(Probe)
admin.site.register(CapitalToComapny)
admin.site.register(CapitalToProject)
admin.site.register(CapitalToTechnology)
admin.site.register(CapitalToProbe)
admin.site.register(CapitalToLaunch)
#admin.site.register(Capital)
admin.site.register(People)
