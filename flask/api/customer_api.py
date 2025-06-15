# customer_api.py
# This file will contain CRUD API endpoints for the Customer resource.

from flask import Blueprint, request, jsonify, abort
from models import db, Customer
from schema import CustomerSchema
from sqlalchemy.exc import IntegrityError

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)

customer_bp = Blueprint('customer_bp', __name__)

# POST: Create a new customer
@customer_bp.route('/customers', methods=['POST'])
def create_customer():
    try:
        data = customer_schema.load(request.json)
        customer = Customer(**data)
        db.session.add(customer)
        db.session.commit()
        return jsonify(customer_schema.dump(customer)), 201
    except Exception as err:
        db.session.rollback()
        return jsonify({"error": str(err)}), 400

# GET: List all customers
@customer_bp.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return jsonify(customers_schema.dump(customers))

# GET: Get a single customer
@customer_bp.route('/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    customer = Customer.query.get(customer_id)
    if not customer:
        return jsonify({"error": "Customer not found"}), 404
    return jsonify(customer_schema.dump(customer))

# PUT: Update customer
@customer_bp.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    customer = Customer.query.get_or_404(id)
    data = request.get_json()
    customer.name = data.get('name', customer.name)
    customer.email = data.get('email', customer.email)
    customer.address = data.get('address', customer.address)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Customer email must be unique."}), 400
    return jsonify(customer_schema.dump(customer))

# DELETE: Delete customer
@customer_bp.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get_or_404(id)
    db.session.delete(customer)
    db.session.commit()
    return '', 204 