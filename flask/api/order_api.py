# order_api.py
# This file contains RESTful API endpoints for the Order resource.

from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from models import db, Order
from schema import OrderSchema
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from .base_resource import BaseResource

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

class OrderListResource(BaseResource):
    """Resource for handling order list operations (GET, POST)"""
    
    def get(self):
        """Get all orders"""
        try:
            orders = Order.query.all()
            return orders_schema.dump(orders)
        except Exception as e:
            return self.handle_general_error(e)
    
    def post(self):
        """Create a new order"""
        try:
            data = order_schema.load(request.json)
            # Set order_date if not provided
            if 'order_date' not in data:
                data['order_date'] = datetime.now()
            order = Order(**data)
            db.session.add(order)
            
            if self.safe_commit():
                return order_schema.dump(order), 201
            else:
                return {"error": "Order creation failed. Check customer_id."}, 400
                
        except ValidationError as e:
            return self.handle_validation_error(e)
        except Exception as e:
            return self.handle_general_error(e)

class OrderResource(BaseResource):
    """Resource for handling individual order operations (GET, PUT, DELETE)"""
    
    def get(self, order_id):
        """Get a single order"""
        try:
            order = Order.query.get(order_id)
            if not order:
                return {"error": "Order not found"}, 404
            return order_schema.dump(order)
        except Exception as e:
            return self.handle_general_error(e)
    
    def put(self, order_id):
        """Update an order"""
        try:
            data = order_schema.load(request.json)
            order = Order.query.get_or_404(order_id)
            
            # Update fields
            for key, value in data.items():
                setattr(order, key, value)
            
            if self.safe_commit():
                return order_schema.dump(order)
            else:
                return {"error": "Order update failed. Check customer_id."}, 400
                
        except ValidationError as e:
            return self.handle_validation_error(e)
        except Exception as e:
            return self.handle_general_error(e)
    
    def delete(self, order_id):
        """Delete an order"""
        try:
            order = Order.query.get_or_404(order_id)
            db.session.delete(order)
            db.session.commit()
            return '', 204
        except Exception as e:
            return self.handle_general_error(e) 