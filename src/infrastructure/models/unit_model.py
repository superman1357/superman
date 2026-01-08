from sqlalchemy import Column, Integer, String, Numeric, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
# Đã sửa: Bỏ chữ 'src.' ở đầu
from infrastructure.databases.base import Base

class UnitModel(Base):
    __tablename__ = 'units'
    __table_args__ = {'schema': 'dbo'}

    unit_id = Column(Integer, primary_key=True, autoincrement=True)
    unit_name = Column(String(100), nullable=False)
    conversion_rate = Column(Float, default=1)
    is_base_unit = Column(Boolean, default=True)
    price = Column(Numeric(12, 2), nullable=True)
    
    # Khóa ngoại: Trỏ về bảng products
    product_id = Column(Integer, ForeignKey('dbo.products.product_id'), nullable=False)

    # Quan hệ ngược lại với ProductModel
    product = relationship("ProductModel", back_populates="units")

    def to_dict(self):
        return {
            'unit_id': self.unit_id,
            'unit_name': self.unit_name,
            'conversion_rate': self.conversion_rate,
            'is_base_unit': self.is_base_unit,
            'price': float(self.price) if self.price else 0,
            'product_id': self.product_id
        }