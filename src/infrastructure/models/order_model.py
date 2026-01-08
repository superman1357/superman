from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey
from infrastructure.databases.base import Base
class OrderModel(Base):
    __tablename__ = 'orders'
   # __table_args__ = {'extend_existing': True}
    order_id = Column(Integer, primary_key=True, autoincrement=True)
    order_date = Column(Date)
    order_status = Column(String(20))
    payment_method = Column(String(50))
    total_amount = Column(Numeric(12, 2))
    # Khóa ngoại
    customer_id = Column(Integer, ForeignKey('customers.customer_id'))
    employee_id = Column(Integer, ForeignKey('employees.employee_id'))