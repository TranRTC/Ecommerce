# order_api.py
# This file will contain CRUD API endpoints for the Order resource.

from flask import Blueprint, request, jsonify, abort
from models import db, Order
from schema import OrderSchema
from sqlalchemy.exc import IntegrityError
from datetime import datetime

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

order_bp = Blueprint('order_bp', __name__)

# POST: Create a new order
@order_bp.route('/orders', methods=['POST'])
def create_order():
    try:
        data = order_schema.load(request.json)
        order = Order(**data)
        db.session.add(order)
        db.session.commit()
        return jsonify(order_schema.dump(order)), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Database integrity error."}), 400
    except Exception as err:
        return jsonify({"error": str(err)}), 400

# GET: List all orders
@order_bp.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify(orders_schema.dump(orders))

# GET: Get a single order
@order_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return jsonify(order_schema.dump(order))

# PUT: Update order
@order_bp.route('/orders/<int:id>', methods=['PUT'])
def update_order(id):
    order = Order.query.get_or_404(id)
    data = request.get_json()
    order.customer_id = data.get('customer_id', order.customer_id)
    order_date_str = data.get('order_date')
    if order_date_str:
        order.order_date = datetime.strptime(order_date_str, '%Y-%m-%d')
    order.status = data.get('status', order.status)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Database integrity error."}), 400
    return jsonify(order_schema.dump(order))

# DELETE: Delete order
@order_bp.route('/orders/<int:id>', methods=['DELETE'])
def delete_order(id):
    order = Order.query.get_or_404(id)
    db.session.delete(order)
    db.session.commit()
    return '', 204 