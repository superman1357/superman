from flask import Blueprint, request
from api.schemas.employee import EmployeeRequestSchema, EmployeeResponseSchema
from infrastructure.repositories.employee_repository import EmployeeRepository
from domain.models.employee import Employee
from api.responses import success_response, error_response

employee_bp = Blueprint('employee_bp', __name__)
repo = EmployeeRepository()

@employee_bp.route('/', methods=['POST'])
def create_employee():
    '''
    Create a new employee
    ---
    tags:
      - Employees
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/EmployeeRequest'
    responses:
      201:
        description: Employee created successfully
    '''
    try:
        data = request.json
        new_emp = Employee(
            employee_name=data['employee_name'],
            owner_id=data['owner_id'],
            role=data.get('role'),
            active_status=data.get('active_status', True)
        )
        result = repo.add(new_emp)
        return success_response(EmployeeResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)

@employee_bp.route('/', methods=['GET'])
def get_employees():
    '''
    Get all employees
    ---
    tags:
      - Employees
    responses:
      200:
        description: List of employees
    '''
    employees = repo.get_all()
    return success_response(EmployeeResponseSchema(many=True).dump(employees))