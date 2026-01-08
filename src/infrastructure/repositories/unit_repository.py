from infrastructure.models.unit_model import UnitModel
from domain.models.unit import Unit
from infrastructure.databases.mssql import session

class UnitRepository:
    def __init__(self, db_session=session):
        self.session = db_session

    def add(self, unit: Unit):
        try:
            db_unit = UnitModel(
                unit_name=unit.unit_name,
                product_id=unit.product_id,
                conversion_rate=unit.conversion_rate,
                is_base_unit=unit.is_base_unit
            )
            self.session.add(db_unit)
            self.session.commit()
            self.session.refresh(db_unit)
            return db_unit
        except Exception as e:
            self.session.rollback()
            raise e

    def get_by_product(self, product_id):
        return self.session.query(UnitModel).filter_by(product_id=product_id).all()