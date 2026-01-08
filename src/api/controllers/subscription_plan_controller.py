from flask import Blueprint, request
from api.schemas.subscription_plan import SubscriptionPlanRequestSchema, SubscriptionPlanResponseSchema
from infrastructure.repositories.subscription_plan_repository import SubscriptionPlanRepository
from domain.models.subscription_plan import SubscriptionPlan
from api.responses import success_response, error_response

subscription_plan_bp = Blueprint('subscription_plan_bp', __name__)
repo = SubscriptionPlanRepository()

@subscription_plan_bp.route('/', methods=['POST'])
def create_plan():
    '''
    Create a new subscription plan
    ---
    tags:
      - Subscription Plans
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/SubscriptionPlanRequest'
    responses:
      201:
        description: Plan created successfully
    '''
    try:
        data = request.json
        new_plan = SubscriptionPlan(
            plan_name=data['plan_name'],
            duration=data.get('duration'),
            price=data.get('price')
        )
        result = repo.add(new_plan)
        return success_response(SubscriptionPlanResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)

@subscription_plan_bp.route('/', methods=['GET'])
def get_plans():
    '''
    Get all subscription plans
    ---
    tags:
      - Subscription Plans
    responses:
      200:
        description: List of plans
    '''
    try:
        plans = repo.get_all()
        return success_response(SubscriptionPlanResponseSchema(many=True).dump(plans))
    except Exception as e:
        return error_response(str(e), 500)