from flask import Blueprint, request
from api.schemas.administrator import AdministratorRequestSchema, AdministratorResponseSchema
from infrastructure.repositories.administrator_repository import AdministratorRepository
from domain.models.administrator import Administrator
from api.responses import success_response, error_response

# 1. Khởi tạo Blueprint
admin_bp = Blueprint('admin_bp', __name__)

# 2. Khởi tạo Repository
repo = AdministratorRepository()

@admin_bp.route('/', methods=['POST'])
def create_admin():
    '''
    Create a new administrator
    ---
    tags:
      - Administrators
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/AdministratorRequest'
    responses:
      201:
        description: Admin created successfully
    '''
    try:
        data = request.json
        # Validate (Optional but recommended)
        schema = AdministratorRequestSchema()
        errors = schema.validate(data)
        if errors:
            return error_response(errors, 400)

        new_admin = Administrator(
            admin_name=data['admin_name'],
            admin_permission=data.get('admin_permission') 
        )
        result = repo.add(new_admin)
        return success_response(AdministratorResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)

@admin_bp.route('/', methods=['GET'])
def get_admins():
    '''
    Get all administrators
    ---
    tags:
      - Administrators
    responses:
      200:
        description: List of administrators
    '''
    admins = repo.get_all()
    return success_response(AdministratorResponseSchema(many=True).dump(admins))