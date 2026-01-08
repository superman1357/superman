from flask import Blueprint, request
from api.schemas.debt import DebtRequestSchema, DebtResponseSchema
from infrastructure.repositories.debt_repository import DebtRepository
from domain.models.debt import Debt
from api.responses import success_response, error_response

debt_bp = Blueprint('debt_bp', __name__)
repo = DebtRepository()

@debt_bp.route('/', methods=['POST'])
def create_debt():
    '''
    Create a new debt record
    ---
    tags:
      - Debts
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/DebtRequest'
    responses:
      201:
        description: Debt created successfully
    '''
    try:
        data = request.json
        new_debt = Debt(
            order_id=data['order_id'], #
            customer_id=data['customer_id'], #
            debt_amount=data['debt_amount'], #
            debt_status=data.get('debt_status', 'Unpaid'), #
            debt_created_date=data.get('debt_created_date') #
        )
        result = repo.add(new_debt)
        return success_response(DebtResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)