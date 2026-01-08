from sqlalchemy import Column, Integer, Numeric
from infrastructure.databases.base import Base
class OrderDetailModel(Base):
    __tablename__ = 'order_details'
    #__table_args__ = {'extend_existing': True}
    order_id = Column(Integer, primary_key=True)
    product_id = Column(Integer, primary_key=True)
    unit_id = Column(Integer)
    order_quantity = Column(Integer)
    unit_price = Column(Numeric(12, 2))
    line_total = Column(Numeric(12, 2))