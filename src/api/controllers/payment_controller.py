from flask import Blueprint, request
from api.schemas.payment import PaymentRequestSchema, PaymentResponseSchema
from infrastructure.repositories.payment_repository import PaymentRepository
from domain.models.payment import Payment
from api.responses import success_response, error_response

payment_bp = Blueprint('payment_bp', __name__)
repo = PaymentRepository()

@payment_bp.route('/', methods=['POST'])
def create_payment():
    '''
    Record a payment for a debt
    ---
    tags:
      - Payments
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/PaymentRequest'
    responses:
      201:
        description: Payment recorded successfully
    '''
    try:
        data = request.json
        new_payment = Payment(
            debt_id=data['debt_id'], #
            amount_paid=data['amount_paid'], #
            payment_method=data['payment_method'], #
            payment_date=data.get('payment_date') #
        )
        result = repo.add(new_payment)
        return success_response(PaymentResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)