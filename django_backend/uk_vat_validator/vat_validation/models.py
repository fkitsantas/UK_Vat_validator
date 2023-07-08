from django.db import models

class VATNumber(models.Model):
    number = models.CharField(max_length=20)

    def __str__(self):
        return self.number

    class Meta:
        app_label = 'vat_validation'
