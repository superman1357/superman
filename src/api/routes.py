from flask import Flask

# --- PHẦN 1: IMPORT AN TOÀN ---

# 1. Todo: Giữ nguyên cơ chế dò tìm
try:
    from api.controllers.todo_controller import bp as todo_bp
except ImportError:
    from api.controllers.todo_controller import todo_blueprint as todo_bp

# 2. Product: Import đúng biến 'product_bp' (Cái này chuẩn rồi)
from api.controllers.product_controller import product_bp

# --- PHẦN 2: CÁC CONTROLLER CHỜ (Comment lại) ---
# ... (Giữ nguyên các dòng comment của cậu) ...

def register_routes(app: Flask):
    """
    Hàm này dùng để đăng ký tất cả các đường dẫn API vào Flask App
    
    """
    print("------------------------------------------------")
    print("🚀 BẮT ĐẦU ĐĂNG KÝ CÁC API...") 
    
    # 1. Todo API
    app.register_blueprint(todo_bp, url_prefix='/todos')
    print("✅ Đã đăng ký: Todo API")
    
    # 2. Product API
    app.register_blueprint(product_bp, url_prefix='/products')
    print("✅ Đã đăng ký: Product API (Thành công!)")

    print("------------------------------------------------")

    # --- CÁC API CHỜ KÍCH HOẠT ---
    # ...