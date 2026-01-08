from flask import Blueprint, request
from api.schemas.unit import UnitRequestSchema, UnitResponseSchema
from infrastructure.repositories.unit_repository import UnitRepository
from domain.models.unit import Unit
from api.responses import success_response, error_response

unit_bp = Blueprint('unit_bp', __name__)
repo = UnitRepository()

@unit_bp.route('/', methods=['POST'])
def create_unit():
    '''
    Create a new unit for a product
    ---
    tags:
      - Units
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/UnitRequest'
    responses:
      201:
        description: Unit created successfully
    '''
    try:
        data = request.json
        new_unit = Unit(
            unit_name=data['unit_name'],
            product_id=data['product_id'],
            conversion_rate=data.get('conversion_rate', 1.0),
            is_base_unit=data.get('is_base_unit', True)
        )
        result = repo.add(new_unit)
        return success_response(UnitResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)