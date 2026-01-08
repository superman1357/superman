from typing import List, Optional
from sqlalchemy.orm import Session
from infrastructure.models.business_owner_model import BusinessOwnerModel
from domain.models.business_owner import BusinessOwner
from infrastructure.databases.mssql import session

class BusinessOwnerRepository:
    def __init__(self, session: Session = session):
        self.session = session

    # Giữ nguyên các phần import của bạn
    def add(self, owner: BusinessOwner) -> BusinessOwnerModel:
        try:
            db_owner = BusinessOwnerModel(
                owner_name=owner.owner_name,
                phone_number=owner.phone_number,
                email=owner.email,
                account_status=owner.account_status,
                admin_id=owner.admin_id, # Đảm bảo dòng này có dữ liệu
                plan_id=owner.plan_id    # Đảm bảo dòng này có dữ liệu
            )
            self.session.add(db_owner)
            self.session.commit()
            self.session.refresh(db_owner)
            return db_owner
        except Exception as e:
            self.session.rollback()
            raise e

    def get_all(self) -> List[BusinessOwnerModel]:
        return self.session.query(BusinessOwnerModel).all()

    def get_by_id(self, owner_id: int) -> Optional[BusinessOwnerModel]:
        return self.session.query(BusinessOwnerModel).filter_by(owner_id=owner_id).first()