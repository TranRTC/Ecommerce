# product_api.py
# This file will contain CRUD API endpoints for the Product resource. 

from flask import Blueprint, request, jsonify
from models import db, Product
from schema import ProductSchema
from sqlalchemy.exc import IntegrityError

product_bp = Blueprint('product_bp', __name__)
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

# Create a new product
@product_bp.route('/products', methods=['POST'])
def create_product():
    try:
        data = product_schema.load(request.json)
        product = Product(**data)
        db.session.add(product)
        db.session.commit()
        return jsonify(product_schema.dump(product)), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Product name must be unique."}), 400
    except Exception as err:
        return jsonify({"error": str(err)}), 400

# List all products
@product_bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify(products_schema.dump(products))

# Get a single product
@product_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product_schema.dump(product))

# Update a product
@product_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.description = data.get('description', product.description)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Product name must be unique."}), 400
    return jsonify(product_schema.dump(product))

# Delete a product
@product_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return '', 204 