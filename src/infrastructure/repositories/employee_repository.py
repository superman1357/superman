from infrastructure.models.employee_model import EmployeeModel
from domain.models.employee import Employee
from infrastructure.databases.mssql import session

class EmployeeRepository:
    def __init__(self, db_session=session):
        self.session = db_session

    def add(self, emp: Employee):
        try:
            db_emp = EmployeeModel(
                employee_name=emp.employee_name,
                owner_id=emp.owner_id,
                role=emp.role,
                active_status=emp.active_status
            )
            self.session.add(db_emp)
            self.session.commit()
            self.session.refresh(db_emp)
            return db_emp
        except Exception as e:
            self.session.rollback()
            raise e

    def get_all(self):
        return self.session.query(EmployeeModel).all()