from infrastructure.models.subscription_plan_model import SubscriptionPlanModel
from domain.models.subscription_plan import SubscriptionPlan
from infrastructure.databases.mssql import session

class SubscriptionPlanRepository:
    def __init__(self, db_session=session):
        self.session = db_session

    def add(self, plan: SubscriptionPlan):
        try:
            db_plan = SubscriptionPlanModel(
                plan_name=plan.plan_name,
                duration=plan.duration,
                price=plan.price
            )
            self.session.add(db_plan)
            self.session.commit()
            self.session.refresh(db_plan)
            return db_plan
        except Exception as e:
            self.session.rollback()
            raise e

    def get_all(self):
        return self.session.query(SubscriptionPlanModel).all()