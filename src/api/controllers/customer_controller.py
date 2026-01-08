from flask import Blueprint, request
from api.schemas.customer import CustomerRequestSchema, CustomerResponseSchema
from infrastructure.repositories.customer_repository import CustomerRepository
from domain.models.customer import Customer
from api.responses import success_response, error_response

customer_bp = Blueprint('customer_bp', __name__)
repo = CustomerRepository()

@customer_bp.route('/', methods=['POST'])
def create_customer():
    '''
    Create a new customer
    ---
    tags:
      - Customers
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/CustomerRequest'
    responses:
      201:
        description: Customer created successfully
    '''
    try:
        data = request.json
        new_cust = Customer(
            customer_name=data['customer_name'],
            owner_id=data['owner_id'],
            phone_number=data.get('phone_number'),
            address=data.get('address'),
            total_outstanding_debt=data.get('total_outstanding_debt', 0)
        )
        result = repo.add(new_cust)
        return success_response(CustomerResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)

@customer_bp.route('/', methods=['GET'])
def get_customers():
    '''
    Get all customers
    ---
    tags:
      - Customers
    responses:
      200:
        description: List of customers
    '''
    customers = repo.get_all()
    return success_response(CustomerResponseSchema(many=True).dump(customers))