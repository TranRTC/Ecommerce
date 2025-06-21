from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from config import config
from models import db

def create_app(config_name=None):
    """Application factory function"""
    if config_name is None:
        config_name = 'default'
    
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)
    CORS(app)
    
    # Initialize Flask-RESTful API
    api = Api(app)
    
    # Register RESTful resources
    from api.manufacturer_api import ManufacturerResource, ManufacturerListResource
    from api.customer_api import CustomerResource, CustomerListResource
    from api.product_api import ProductResource, ProductListResource
    from api.order_api import OrderResource, OrderListResource
    from api.orderitem_api import OrderItemResource, OrderItemListResource
    
    # Add resources to API
    api.add_resource(ManufacturerListResource, '/manufacturers')
    api.add_resource(ManufacturerResource, '/manufacturers/<int:manufacturer_id>')
    api.add_resource(CustomerListResource, '/customers')
    api.add_resource(CustomerResource, '/customers/<int:customer_id>')
    api.add_resource(ProductListResource, '/products')
    api.add_resource(ProductResource, '/products/<int:product_id>')
    api.add_resource(OrderListResource, '/orders')
    api.add_resource(OrderResource, '/orders/<int:order_id>')
    api.add_resource(OrderItemListResource, '/orderitems')
    api.add_resource(OrderItemResource, '/orderitems/<int:orderitem_id>')
    
    # Simple home route
    @app.route('/')
    def home():
        return jsonify({"message": "Welcome to the eCommerce API! The backend is running."})
    
    return app

# Create app instance
app = create_app()

if __name__ == "__main__":
    app.run(debug=app.config.get('DEBUG', True)) 