from flask import Blueprint, request
from api.schemas.account_report import AccountReportRequestSchema, AccountReportResponseSchema
from infrastructure.repositories.account_report_repository import AccountReportRepository
from domain.models.account_report import AccountReport
from api.responses import success_response, error_response

account_report_bp = Blueprint('account_report_bp', __name__)
repo = AccountReportRepository()

@account_report_bp.route('/', methods=['POST'])
def create_report():
    '''
    Create a new account report
    ---
    tags:
      - Account Reports
    parameters:
      - in: body
        name: body
        schema:
          $ref: '#/components/schemas/AccountReportRequest'
    responses:
      201:
        description: Report created successfully
    '''
    try:
        data = request.json
        new_report = AccountReport(
            owner_id=data['owner_id'],
            report_type=data['report_type'],
            reporting_period=data['reporting_period'],
            generated_date=data['generated_date']
        )
        result = repo.add(new_report)
        return success_response(AccountReportResponseSchema().dump(result), 201)
    except Exception as e:
        return error_response(str(e), 500)