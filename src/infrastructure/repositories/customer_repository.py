from infrastructure.models.customer_model import CustomerModel
from domain.models.customer import Customer
from infrastructure.databases.mssql import session

class CustomerRepository:
    def __init__(self, db_session=session):
        self.session = db_session

    def add(self, cust: Customer):
        try:
            db_cust = CustomerModel(
                customer_name=cust.customer_name,
                owner_id=cust.owner_id,
                phone_number=cust.phone_number,
                address=cust.address,
                total_outstanding_debt=cust.total_outstanding_debt
            )
            self.session.add(db_cust)
            self.session.commit()
            self.session.refresh(db_cust)
            return db_cust
        except Exception as e:
            self.session.rollback()
            raise e

    def get_all(self):
        return self.session.query(CustomerModel).all()