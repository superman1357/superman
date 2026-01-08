from infrastructure.models.administrator_model import AdministratorModel
from domain.models.administrator import Administrator
from infrastructure.databases.mssql import session

class AdministratorRepository:
    def __init__(self, db_session=session):
        self.session = db_session

    def add(self, admin: Administrator):
        try:
            db_admin = AdministratorModel(
                admin_name=admin.admin_name,
                admin_permission=admin.admin_permission # Lưu quyền ở đây
            )
            self.session.add(db_admin)
            self.session.commit()
            self.session.refresh(db_admin)
            return db_admin
        except Exception as e:
            self.session.rollback()
            raise e

    def get_all(self):
        return self.session.query(AdministratorModel).all()
    