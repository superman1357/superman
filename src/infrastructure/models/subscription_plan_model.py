from sqlalchemy import Column, Integer, String, Numeric
from infrastructure.databases.base import Base

class SubscriptionPlanModel(Base):
    __tablename__ = 'subscription_plans'
    #__table_args__ = {'extend_existing': True}

    plan_id = Column(Integer, primary_key=True, autoincrement=True)
    plan_name = Column(String(100), nullable=False)
    duration = Column(Integer)  # Số ngày (ví dụ: 30, 365)
    price = Column(Numeric(12, 2))