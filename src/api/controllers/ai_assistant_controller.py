from flask import Blueprint, request
from api.schemas.ai_assistant import AIAssistantRequestSchema, AIAssistantResponseSchema
from infrastructure.repositories.ai_assistant_repository import AIAssistantRepository
from domain.models.ai_assistant import AIAssistant
from api.responses import success_response, error_response

ai_assistant_bp = Blueprint('ai_assistant_bp', __name__)
repo = AIAssistantRepository()

@ai_assistant_bp.route('/', methods=['POST'])
def create_ai():
    '''
    Create a new AI Assistant version
    ---
    tags:
      - AI Assistants
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/AIAssistantRequest'
    responses:
      201:
        description: AI created successfully
    '''
    try:
        data = request.json
        new_ai = AIAssistant(
            version=data['version'],
            supported_languages=data.get('supported_languages'),
            ai_model_type=data.get('ai_model_type')
        )
        result = repo.add(new_ai)
        return success_response(AIAssistantResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)