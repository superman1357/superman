from flask import Blueprint, request
from api.schemas.order import OrderRequestSchema, OrderResponseSchema
from infrastructure.repositories.order_repository import OrderRepository
from domain.models.order import Order
from api.responses import success_response, error_response

order_bp = Blueprint('order_bp', __name__)
repo = OrderRepository()

@order_bp.route('/', methods=['POST'])
def create_order():
    '''
    Create a new order
    ---
    tags:
      - Orders
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/OrderRequest'
    responses:
      201:
        description: Order created successfully
    '''
    try:
        data = request.json
        new_order = Order(
            customer_id=data['customer_id'],
            employee_id=data['employee_id'],
            order_date=data['order_date'],
            order_status=data.get('order_status', 'Pending'),
            payment_method=data.get('payment_method', 'Cash'),
            total_amount=data.get('total_amount', 0)
        )
        result = repo.add(new_order)
        return success_response(OrderResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)