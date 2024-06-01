from django.db import models

class Reference(models.Model):
    name = models.CharField(max_length=100, blank=True)
    cite = models.CharField(max_length=500)

    def __str__(self):
        if self.name:
            return self.name
        else:
            # Split the citation into words and return the first 5 words
            words = self.cite.split()
            return ' '.join(words[:5])

class Paragraph(models.Model):
    title = models.CharField(max_length=200, blank=True)
    content = models.TextField()
    order = models.PositiveIntegerField(blank=True)

    def __str__(self):
        # Split the title or content into words
        words = self.title.split() if self.title else self.content.split()
        # Take the first 7 words (or all words if there are fewer than 7)
        truncated_words = ' '.join(words[:7])
        # If order exists, append it with a "|"
        if self.order:
            return f"{truncated_words}{' |' if truncated_words else ''} {self.order}"
        else:
            return truncated_words

class Image(models.Model):
    image = models.ImageField(upload_to='article_images/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(blank=True)

    def __str__(self):
        # Split the title or content into words
        words = self.caption.split() if self.caption else "image"
        # Take the first 7 words (or all words if there are fewer than 7)
        truncated_words = ' '.join(words[:7])
        # If order exists, append it with a "|"
        if self.order:
            return f"{truncated_words}{' |' if truncated_words else ''} {self.order}"
        else:
            return truncated_words

class Article(models.Model):
    type = [
        ('general', 'general'),
        ('company', 'company'),
        ('project', 'project'),
        ('launch', 'launch'),
        ('technology', 'technology'),
        ('capital', 'capital'),
    ]
    title = models.CharField(max_length=200, blank=True)
    subtitle = models.CharField(max_length=200, blank=True)
    type = models.CharField(max_length=20, choices=type, blank=True)
    paragraphs = models.ManyToManyField('Paragraph', related_name='paragraphs_Article', blank=True)
    images = models.ManyToManyField('Image', related_name='images_Article', blank=True)
    publish_date = models.DateField(auto_now_add=True)
    author_name = models.CharField(max_length=100, blank=True)
    thumbnail = models.ImageField(upload_to='article_thumbnails/', blank=True, null=True)
    reference = models.ManyToManyField(Reference, related_name='reference_Article', blank=True)

    def __str__(self):
        return f"{self.title}"

class NewsStory(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    paragraphs = models.ManyToManyField(Paragraph, related_name='paragraphs_NewsStory', blank=True)
    images = models.ManyToManyField(Image, related_name='images_NewsStory', blank=True)
    publish_date = models.DateField(auto_now_add=True)
    author_name = models.CharField(max_length=100, blank=True)
    thumbnail = models.ImageField(upload_to='newsstory_thumbnails/', blank=True, null=True)
    reference = models.ManyToManyField(Reference, related_name='reference_NewsStory', blank=True)

    def __str__(self):
        return f"{self.title}"


class People(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"

class Company(models.Model):
    organisation_type = [
        ('private', 'private'),
        ('government', 'government'),
        ('nonprofit', 'nonprofit'),
        ('collaboration', 'collaboration'),
        ('investor','investor'),
    ]
        
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='company_logo/', blank=True, null=True)
    type = models.CharField(max_length=20, choices=organisation_type, blank=True)
    founder = models.ManyToManyField(People, related_name='founder_Company', blank=True)
    location = models.CharField(max_length=150 , blank=True)
    objective = models.CharField(max_length=400, blank=True)
    incorporation_date = models.DateField(blank=True, null=True)
    parent_company = models.ManyToManyField('self', blank=True, related_name='parent_company_Company', symmetrical=False)
    daughter_company = models.ManyToManyField('self', blank=True, related_name='daughter_company_Company', symmetrical=False)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='article_Company', blank=True, null=True)
    reference = models.ManyToManyField(Reference, related_name='reference_Company', blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Update parent and daughter projects relationships
        for parent_company in self.parent_company.all():
            if self not in parent_company.daughter_company.all():
                parent_company.daughter_company.add(self)

        for daughter_company in self.daughter_company.all():
            if self not in daughter_company.parent_company.all():
                daughter_company.parent_company.add(self)

    def __str__(self):
        return f"{self.name}"

class Project(models.Model):
    name = models.CharField(max_length=100)
    developers = models.ManyToManyField(Company, related_name='developers_Project', blank=True)
    logo = models.ImageField(upload_to='project_logo/', blank=True, null=True)
    codevelopers = models.ManyToManyField(Company, related_name='codevelopers_Project', blank=True)
    objective = models.CharField(max_length=400, blank=True)
    start_date = models.DateField(blank=True, null=True)
    parent_projects = models.ManyToManyField('self', blank=True, related_name='parent_project_Project', symmetrical=False)
    daughter_projects = models.ManyToManyField('self', blank=True, related_name='daughter_project_Project', symmetrical=False)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='article_Project', blank=True, null=True)
    reference = models.ManyToManyField(Reference, related_name='reference_Project', blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Update parent and daughter projects relationships
        for parent_project in self.parent_projects.all():
            if self not in parent_project.daughter_projects.all():
                parent_project.daughter_projects.add(self)

        for daughter_project in self.daughter_projects.all():
            if self not in daughter_project.parent_projects.all():
                daughter_project.parent_projects.add(self)

    def __str__(self):
        return f"{self.name}"

class Technology(models.Model):
    name = models.CharField(max_length=100)
    developer = models.ManyToManyField(Company, related_name='developer_Technology', blank=True)
    project = models.ManyToManyField(Project, related_name='project_Technology', blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='article_Technology', blank=True, null=True)
    reference = models.ManyToManyField(Reference, related_name='reference_Technology', blank=True)

    def __str__(self):
        return f"{self.name}"

class Launch(models.Model):
    Status = [
        ('completed', 'completed'),
        ('ongoing', 'ongoing'),
        ('failed', 'failed'),
        ('planned', 'planned'),
        ('proposed', 'proposed'),
    ] 
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=100, choices=Status, blank=True)
    logo = models.ImageField(upload_to='launch_logo/', blank=True, null=True)
    launch_date = models.DateField(blank=True)
    mission_length = models.CharField(max_length=100, blank=True)
    launch_vehicle = models.CharField(max_length=100, blank=True)
    objective = models.CharField(max_length=400, blank=True)
    primary_owner = models.ManyToManyField(Company, related_name='primary_owner_Launch', blank=True)
    secondary_owner = models.ManyToManyField(Company, related_name='secondary_owner_Launch', blank=True)
    project = models.ManyToManyField(Project, related_name='project_Launch', blank=True)
    technology = models.ManyToManyField(Technology, related_name='technology_Launch', blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='article_Launch', blank=True, null=True)
    reference = models.ManyToManyField(Reference, related_name='reference_Launch', blank=True)

class Probe(models.Model):
    probe_type = [
        ('orbiter', 'orbitor'),
        ('lander', 'lander'),
        ('rover', 'rover'),
    ]  
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=150, choices=probe_type, blank=True)
    launch = models.ForeignKey(Launch, related_name='launch_Probe', on_delete=models.CASCADE)
    mass = models.BigIntegerField(blank=True)
    technology = models.ManyToManyField(Technology, related_name='technology_Probe', blank=True)
    reference = models.ManyToManyField(Reference, related_name='reference_Probe', blank=True)

class CapitalToComapny(models.Model):
    name = models.ForeignKey(Company, related_name='name_CapitalToCompany', blank=True, on_delete=models.CASCADE)
    amount = models.BigIntegerField(default=0, null=True, blank=True)
    Reference = models.ManyToManyField(Reference, related_name='reference_CapitalToCompany', blank=True)

    def __str__(self):
        return f"{self.name.name} | {self.amount}"

class CapitalToProject(models.Model):
    name = models.ForeignKey(Project, related_name='name_CapitalToProject', blank=True, on_delete=models.CASCADE)
    amount = models.BigIntegerField(default=0, null=True, blank=True)
    Reference = models.ManyToManyField(Reference, related_name='reference_CapitalToProject', blank=True)

    def __str__(self):
        return f"{self.name.name} | {self.amount}"

class CapitalToTechnology(models.Model):
    name = models.ForeignKey(Technology, related_name='name_CapitalToTechnology', blank=True, on_delete=models.CASCADE)
    amount = models.BigIntegerField(default=0, null=True, blank=True)
    Reference = models.ManyToManyField(Reference, related_name='reference_CapitalToTechnology', blank=True)

    def __str__(self):
        return f"{self.name.name} | {self.amount}"

class CapitalToProbe(models.Model):
    name = models.ForeignKey(Probe, related_name='name_CapitalToProbe', blank=True, on_delete=models.CASCADE)
    amount = models.BigIntegerField(default=0, null=True, blank=True)
    Reference = models.ManyToManyField(Reference, related_name='reference_CapitalToProbe', blank=True)

    def __str__(self):
        return f"{self.name.name} | {self.amount}"

class CapitalToLaunch(models.Model):
    name = models.ForeignKey(Launch, related_name='name_CapitalToLaunch', blank=True, on_delete=models.CASCADE)
    amount = models.BigIntegerField(default=0, null=True, blank=True)
    Reference = models.ManyToManyField(Reference, related_name='reference_CapitalToLaunch', blank=True)

    def __str__(self):
        return f"{self.name.name} | {self.amount}"

class Capital(models.Model):
    capital_type = [
        ('investment', 'investment'),
        ('grant', 'grant'),
        ('contract', 'contract'),
    ]

    status = [
        ('delievered', 'delievered'),
        ('inprocess', 'inprocess'),
        ('announced', 'announced'),
        ('rumored', 'rumored'),
        ('canceled', 'canceled'),
    ]

    name = models.CharField(max_length=200, blank=True)
    type = models.CharField(max_length=20, choices=capital_type, blank=True)
    amount =  models.BigIntegerField(default=0, null=True, blank=True)
    date = models.DateField(blank=True)
    status = models.CharField(max_length=20, choices=status,blank=True)
    capital_from = models.ManyToManyField(Company, related_name='capital_from_Capital', blank=True)
    capital_to_company = models.ManyToManyField(CapitalToComapny, related_name='capital_to_company_Capital', blank=True)
    capital_to_project = models.ManyToManyField(CapitalToProject, related_name='capital_to_project_Capital', blank=True)
    capital_to_technology = models.ManyToManyField(CapitalToTechnology, related_name='capital_to_technology_Capital', blank=True)
    capital_to_probe = models.ManyToManyField(CapitalToProbe, related_name='capital_to_probe_Capital', blank=True)
    capital_to_launch = models.ManyToManyField(CapitalToLaunch, related_name='capital_to_launch_Capital', blank=True)
    parent_capital = models.ManyToManyField('self', blank=True, related_name='parent_capital_Capital', symmetrical=False)
    daughter_capital = models.ManyToManyField('self', blank=True, related_name='daughter_capital_Capital', symmetrical=False)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='article_Capital', blank=True, null=True)
    reference = models.ManyToManyField(Reference, related_name='reference_Capital', blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Update parent and daughter projects relationships
        for parent_capital in self.parent_capital.all():
            if self not in parent_capital.daughter_capital.all():
                parent_capital.daughter_capital.add(self)

        for daughter_capital in self.daughter_capital.all():
            if self not in daughter_capital.parent_capital.all():
                daughter_capital.parent_capital.add(self)

    def __str__(self):
        return f"{self.name}"


