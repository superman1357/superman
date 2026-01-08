from sqlalchemy import Column, Integer, String, Numeric, ForeignKey
from sqlalchemy.orm import relationship
# Đã sửa: Bỏ chữ 'src.' ở đầu để không bị lỗi ModuleNotFoundError
from infrastructure.databases.base import Base

class ProductModel(Base):
    __tablename__ = 'products'
    # Quan trọng: Chỉ định schema là dbo cho SQL Server
    __table_args__ = {'schema': 'dbo'}

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Khóa ngoại: Liên kết với bảng chủ cửa hàng (business_owners)
    # Lưu ý: Cần chắc chắn bảng 'business_owners' đã có trong DB
    owner_id = Column(Integer, ForeignKey('dbo.business_owners.owner_id'), nullable=False)
    
    product_name = Column(String(100), nullable=False)
    selling_price = Column(Numeric(12, 2))
    stock_quantity = Column(Integer, default=0)
    
    # Thiết lập mối quan hệ: Khi lấy Product sẽ lấy luôn danh sách Units
    units = relationship("UnitModel", back_populates="product", lazy="joined")

    def to_dict(self):
        """Chuyển đổi dữ liệu sang JSON"""
        return {
            'product_id': self.product_id,
            'product_name': self.product_name,
            'selling_price': float(self.selling_price) if self.selling_price else 0,
            'stock_quantity': self.stock_quantity,
            'owner_id': self.owner_id,
            # Trả về danh sách đơn vị tính kèm theo
            'units': [unit.to_dict() for unit in self.units] if self.units else []
        }