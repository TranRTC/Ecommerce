from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS, SECRET_KEY
from models import db

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Load config
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS
    app.config['SECRET_KEY'] = SECRET_KEY

    db.init_app(app)
    migrate = Migrate(app, db)

    # Register resource Blueprints here
    from api.manufacturer_api import manufacturer_bp
    app.register_blueprint(manufacturer_bp)
    from api.customer_api import customer_bp
    app.register_blueprint(customer_bp)
    from api.product_api import product_bp
    app.register_blueprint(product_bp)
    from api.order_api import order_bp
    app.register_blueprint(order_bp)
    from api.orderitem_api import orderitem_bp
    app.register_blueprint(orderitem_bp)
    
    # ...register other resource Blueprints as needed

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True) 