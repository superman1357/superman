from flask import Blueprint, request
from api.schemas.ai_draft_order import AIDraftOrderRequestSchema, AIDraftOrderResponseSchema
from infrastructure.repositories.ai_draft_order_repository import AIDraftOrderRepository
from domain.models.ai_draft_order import AIDraftOrder
from api.responses import success_response, error_response

ai_draft_order_bp = Blueprint('ai_draft_order_bp', __name__)
repo = AIDraftOrderRepository()

@ai_draft_order_bp.route('/', methods=['POST'])
def create_draft():
    '''
    Create a new AI draft order
    ---
    tags:
      - AI Draft Orders
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/AIDraftOrderRequest'
    responses:
      201:
        description: Draft created successfully
    '''
    try:
        data = request.json
        new_draft = AIDraftOrder(
            employee_id=data['employee_id'],
            ai_id=data['ai_id'],
            customer_id=data['customer_id'],
            recognized_content=data['recognized_content'],
            confirmation_status=data.get('confirmation_status', 'Pending'),
            source=data.get('source')
        )
        result = repo.add(new_draft)
        return success_response(AIDraftOrderResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)