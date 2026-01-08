from flask import Flask, jsonify
from api.swagger import spec
from api.middleware import middleware
from api.responses import success_response
from infrastructure.databases import init_db
from config import Config
from flasgger import Swagger
from config import SwaggerConfig
from flask_swagger_ui import get_swaggerui_blueprint
from api.routes import register_routes
from flask_cors import CORS  # <--- [MỚI] Import thư viện CORS
import infrastructure.models

def create_app():
    app = Flask(__name__)
    CORS(app) # <--- [MỚI] Dòng này cực quan trọng để Swagger không bị lỗi đỏ
    
    Swagger(app)
    
    # Đăng ký các API (Product, Todo,...) thông qua hàm này
    register_routes(app) 

    # Cấu hình Swagger UI
    SWAGGER_URL = '/docs'
    API_URL = '/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={'app_name': "Todo API"}
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    try:
        init_db(app)
    except Exception as e:
        print(f"Error initializing database: {e}")

    middleware(app)

    # Tự động quét Swagger docs
    with app.app_context():
        for rule in app.url_map.iter_rules():
            if not rule.endpoint.startswith(('static', 'swagger')):
                view_func = app.view_functions[rule.endpoint]
                spec.path(view=view_func)

    @app.route("/swagger.json")
    def swagger_json():
        return jsonify(spec.to_dict())

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=9999, debug=True)