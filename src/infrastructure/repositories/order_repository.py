from infrastructure.models.order_model import OrderModel
from domain.models.order import Order
from infrastructure.databases.mssql import session

class OrderRepository:
    def __init__(self, db_session=session):
        self.session = db_session

    def add(self, order: Order):
        try:
            db_order = OrderModel(
                customer_id=order.customer_id,
                employee_id=order.employee_id,
                order_date=order.order_date,
                order_status=order.order_status,
                payment_method=order.payment_method,
                total_amount=order.total_amount
            )
            self.session.add(db_order)
            self.session.commit()
            self.session.refresh(db_order)
            return db_order
        except Exception as e:
            self.session.rollback()
            raise e

    def get_all(self):
        return self.session.query(OrderModel).all()