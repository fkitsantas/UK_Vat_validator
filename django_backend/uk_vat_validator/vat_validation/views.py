from django.http import JsonResponse
from .models import VATNumber
import requests

# Class to validate VAT numbers
class VATValidator:
    def __init__(self, vat_number):
        self.vat_number = vat_number
        # Remove the leading "GB" if present
        if self.vat_number.startswith("GB"):
            self.vat_number = self.vat_number[2:]

    # Method to validate UK VAT numbers
    def validate_uk_vat(self):
        # Check if VAT number length is 9
        if len(self.vat_number) != 9:
            return False

        # VAT numbers starting with 'GD', 'HA', and 'GD' are not valid
        if self.vat_number.startswith(("GD", "HA", "GD")):
            return False
        
        # Remove the leading "GB" if present
        if self.vat_number.startswith("GB"):
            self.vat_number = self.vat_number[2:]

        # Perform the check
        try:
            int(self.vat_number)
        except ValueError:
            return False

        # Calculate the checksum
        weights = [8, 7, 6, 5, 4, 3, 2]
        check_sum = sum(int(self.vat_number[i]) * weights[i] for i in range(7))
        check_digits = 97 - (check_sum % 97)

        # Check if the calculated digits match the last two digits of the VAT number
        return check_digits == int(self.vat_number[7:])

    # Method to validate business VAT numbers
    def validate_business_vat(self):
        # Check if VAT number is a digit
        if not self.vat_number.isdigit():
            return {'is_valid': False, 'error_message': 'Invalid VAT number'}

        # Remove the leading "GB" if present
        if self.vat_number.startswith("GB"):
            self.vat_number = self.vat_number[2:]

        # Validate the VAT number using the HMRC VAT API
        url = f'https://api.service.hmrc.gov.uk/organisations/vat/check-vat-number/lookup/{self.vat_number}'
        response = requests.get(url)

        # Print the API response for debugging
        print(response.text)

        # Check the response status code
        if response.status_code == 200:
            data = response.json()
            target = data.get('target')
            if target is not None:
                return {'is_valid': True, 'name': target['name'], 'address': target['address']}
        elif response.status_code == 404:
            return {'is_valid': False, 'error_message': 'Invalid VAT number'}

        return {'is_valid': False, 'error_message': 'Unknown error'}

# Django view function to validate VAT numbers
def validate_vat(request):
    vat_number = request.GET.get('vat_number')
    is_business = request.GET.get('is_business') == 'true'

    # Check if VAT number is provided
    if vat_number:
        # Get or create a VATNumber object
        vat_obj, _ = VATNumber.objects.get_or_create(number=vat_number)
        validator = VATValidator(vat_number)

        # Check if the VAT number is for a business
        if is_business:
            data = validator.validate_business_vat()
        else:
            is_valid = validator.validate_uk_vat()
            data = {'is_valid': is_valid}
    else:
        data = {'error': 'Invalid VAT number'}

    # Return the data as JSON
    return JsonResponse(data)