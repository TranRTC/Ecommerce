# orderitem_api.py
# This file will contain CRUD API endpoints for the OrderItem association resource. 

from flask import Blueprint, request, jsonify
from models import db, OrderItem
from schema import OrderItemSchema
from sqlalchemy.exc import IntegrityError

orderitem_bp = Blueprint('orderitem_bp', __name__)
orderitem_schema = OrderItemSchema()
orderitems_schema = OrderItemSchema(many=True)

@orderitem_bp.route('/orderitems', methods=['GET'])
def get_orderitems():
    orderitems = OrderItem.query.all()
    return jsonify(orderitems_schema.dump(orderitems))

@orderitem_bp.route('/orderitems', methods=['POST'])
def create_orderitem():
    try:
        data = orderitem_schema.load(request.json)
        orderitem = OrderItem(**data)
        db.session.add(orderitem)
        db.session.commit()
        return jsonify(orderitem_schema.dump(orderitem)), 201
    except Exception as err:
        db.session.rollback()
        return jsonify({"error": str(err)}), 400

@orderitem_bp.route('/order-items', methods=['GET'])
def get_order_items():
    order_items = OrderItem.query.all()
    return jsonify(orderitems_schema.dump(order_items))

@orderitem_bp.route('/orderitems/<int:id>', methods=['GET'])
def get_orderitem(id):
    orderitem = OrderItem.query.get(id)
    if not orderitem:
        return jsonify({"error": "OrderItem not found"}), 404
    return jsonify(orderitem_schema.dump(orderitem))

@orderitem_bp.route('/orderitems/<int:id>', methods=['PUT'])
def update_orderitem(id):
    orderitem = OrderItem.query.get_or_404(id)
    data = request.get_json()
    orderitem.order_id = data.get('order_id', orderitem.order_id)
    orderitem.product_id = data.get('product_id', orderitem.product_id)
    orderitem.quantity = data.get('quantity', orderitem.quantity)
    try:
        db.session.commit()
        return jsonify(orderitem_schema.dump(orderitem)), 200
    except Exception as err:
        db.session.rollback()
        return jsonify({"error": str(err)}), 400

@orderitem_bp.route('/order-items/<int:order_item_id>', methods=['PUT'])
def update_order_item(order_item_id):
    order_item = OrderItem.query.get_or_404(order_item_id)
    data = request.get_json()
    order_item.order_id = data.get('order_id', order_item.order_id)
    order_item.product_id = data.get('product_id', order_item.product_id)
    order_item.quantity = data.get('quantity', order_item.quantity)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Database integrity error."}), 400
    return jsonify(orderitem_schema.dump(order_item))

@orderitem_bp.route('/order-items/<int:order_item_id>', methods=['DELETE'])
def delete_order_item(order_item_id):
    order_item = OrderItem.query.get_or_404(order_item_id)
    db.session.delete(order_item)
    db.session.commit()
    return '', 204

@orderitem_bp.route('/orderitems/<int:id>', methods=['DELETE'])
def delete_orderitem(id):
    orderitem = OrderItem.query.get_or_404(id)
    db.session.delete(orderitem)
    db.session.commit()
    return '', 204 