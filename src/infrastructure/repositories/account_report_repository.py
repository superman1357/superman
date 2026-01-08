from infrastructure.models.account_report_model import AccountReportModel
from domain.models.account_report import AccountReport
from infrastructure.databases.mssql import session

class AccountReportRepository:
    def __init__(self, db_session=session):
        self.session = db_session

    def add(self, report: AccountReport):
        try:
            db_report = AccountReportModel(
                owner_id=report.owner_id,
                report_type=report.report_type,
                reporting_period=report.reporting_period,
                generated_date=report.generated_date
            )
            self.session.add(db_report)
            self.session.commit()
            self.session.refresh(db_report)
            return db_report
        except Exception as e:
            self.session.rollback()
            raise e