from infrastructure.repositories.product_repository import ProductRepository
from infrastructure.models.product_model import ProductModel

class ProductService:
    def __init__(self):
        self.product_repo = ProductRepository()

    def create_product(self, data):
        # 1. Bóc tách dữ liệu
        owner_id = data.get('owner_id')
        name = data.get('product_name')
        price = data.get('selling_price')
        quantity = data.get('stock_quantity', 0)

        # 2. KIỂM TRA (VALIDATION)
        # Kiểm tra dữ liệu bắt buộc
        if not owner_id or not name or price is None:
            raise ValueError("Thiếu thông tin: owner_id, product_name hoặc selling_price")

        # Kiểm tra logic nghiệp vụ
        if float(price) < 0:
            raise ValueError("Giá bán không được nhỏ hơn 0")

        if int(quantity) < 0:
            raise ValueError("Số lượng tồn kho không được âm")

        # 3. Đóng gói dữ liệu vào Model
        new_product = ProductModel(
            owner_id=owner_id,
            product_name=name,
            selling_price=price,
            stock_quantity=quantity
        )

        # 4. Gửi xuống Repository
        return self.product_repo.add(new_product)

    def get_products_by_owner(self, owner_id):
        return self.product_repo.get_all_by_owner(owner_id)