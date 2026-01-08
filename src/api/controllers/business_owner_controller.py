from flask import Blueprint, request
from api.schemas.business_owner import BusinessOwnerRequestSchema, BusinessOwnerResponseSchema
from infrastructure.repositories.business_owner_repository import BusinessOwnerRepository
from domain.models.business_owner import BusinessOwner
from api.responses import success_response, error_response

# 1. Khởi tạo Blueprint
business_owner_bp = Blueprint('business_owner_bp', __name__)

# 2. Khởi tạo Repository
repo = BusinessOwnerRepository()

@business_owner_bp.route('/', methods=['POST'])
def create_owner():
    '''
    Create a new business owner
    ---
    tags:
      - Business Owners
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/BusinessOwnerRequest'
    responses:
      201:
        description: Owner created successfully
    '''
    try:
        data = request.json
        
        # Tạo đối tượng Domain từ dữ liệu nhận được
        new_owner = BusinessOwner(
            owner_name=data['owner_name'],
            admin_id=data['admin_id'], 
            plan_id=data['plan_id'],   
            phone_number=data.get('phone_number'),
            email=data.get('email'),
            account_status=data.get('account_status')
        )
        
        # Lưu vào Database qua Repository
        result = repo.add(new_owner)
        
        # Trả về kết quả đã format qua Response Schema
        return success_response(BusinessOwnerResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)

@business_owner_bp.route('/', methods=['GET'])
def get_owners():
    '''
    Get all business owners
    ---
    tags:
      - Business Owners
    responses:
      200:
        description: List of business owners
    '''
    try:
        owners = repo.get_all()
        return success_response(BusinessOwnerResponseSchema(many=True).dump(owners))
    except Exception as e:
        return error_response(str(e), 500)