from flask import Blueprint, request, jsonify
# Chỉ import đúng Service, không import linh tinh
from services.product_service import ProductService

product_bp = Blueprint('product_bp', __name__)
product_service = ProductService()

@product_bp.route('/', methods=['POST'])
def create_product():
    """
    Tạo sản phẩm mới (Đã có kiểm tra logic)
    ---
    tags:
      - Products
    parameters:
      - in: body
        name: body
        schema:
          type: object
          required:
            - owner_id
            - product_name
            - selling_price
          properties:
            owner_id:
              type: integer
              example: 1
            product_name:
              type: string
              example: "Trà Đào Cam Sả"
            selling_price:
              type: number
              example: 45000
            stock_quantity:
              type: integer
              example: 50
    responses:
      201:
        description: Tạo thành công
      400:
        description: Lỗi logic (Giá âm, thiếu tin...)
    """
    try:
        data = request.get_json()
        product = product_service.create_product(data)
        
        return jsonify({
            "message": "Tạo sản phẩm thành công",
            "data": {
                "product_id": product.product_id,
                "product_name": product.product_name
            }
        }), 201
    except ValueError as ve:
        # Trả về lỗi 400 nếu vi phạm logic (ví dụ giá âm)
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        # Trả về lỗi 500 nếu lỗi hệ thống
        return jsonify({"error": "Lỗi Server: " + str(e)}), 500

@product_bp.route('/owner/<int:owner_id>', methods=['GET'])
def get_products(owner_id):
    """
    Xem danh sách sản phẩm
    ---
    tags:
      - Products
    parameters:
      - name: owner_id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: Thành công
    """
    try:
        products = product_service.get_products_by_owner(owner_id)
        result = []
        for p in products:
            result.append({
                "product_id": p.product_id,
                "product_name": p.product_name,
                "selling_price": float(p.selling_price) if p.selling_price else 0,
                "stock_quantity": p.stock_quantity
            })
        return jsonify({"data": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500