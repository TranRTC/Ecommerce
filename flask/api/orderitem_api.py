# orderitem_api.py
# This file contains RESTful API endpoints for the OrderItem resource.

from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from models import db, OrderItem
from schema import OrderItemSchema
from sqlalchemy.exc import IntegrityError
from .base_resource import BaseResource

orderitem_schema = OrderItemSchema()
orderitems_schema = OrderItemSchema(many=True)

class OrderItemListResource(BaseResource):
    """Resource for handling orderitem list operations (GET, POST)"""
    
    def get(self):
        """Get all order items"""
        try:
            orderitems = OrderItem.query.all()
            return orderitems_schema.dump(orderitems)
        except Exception as e:
            return self.handle_general_error(e)
    
    def post(self):
        """Create a new order item"""
        try:
            data = orderitem_schema.load(request.json)
            orderitem = OrderItem(**data)
            db.session.add(orderitem)
            
            if self.safe_commit():
                return orderitem_schema.dump(orderitem), 201
            else:
                return {"error": "Order item creation failed. Check order_id and product_id."}, 400
                
        except ValidationError as e:
            return self.handle_validation_error(e)
        except Exception as e:
            return self.handle_general_error(e)

class OrderItemResource(BaseResource):
    """Resource for handling individual orderitem operations (GET, PUT, DELETE)"""
    
    def get(self, orderitem_id):
        """Get a single order item"""
        try:
            orderitem = OrderItem.query.get(orderitem_id)
            if not orderitem:
                return {"error": "Order item not found"}, 404
            return orderitem_schema.dump(orderitem)
        except Exception as e:
            return self.handle_general_error(e)
    
    def put(self, orderitem_id):
        """Update an order item"""
        try:
            data = orderitem_schema.load(request.json)
            orderitem = OrderItem.query.get_or_404(orderitem_id)
            
            # Update fields
            for key, value in data.items():
                setattr(orderitem, key, value)
            
            if self.safe_commit():
                return orderitem_schema.dump(orderitem)
            else:
                return {"error": "Order item update failed. Check order_id and product_id."}, 400
                
        except ValidationError as e:
            return self.handle_validation_error(e)
        except Exception as e:
            return self.handle_general_error(e)
    
    def delete(self, orderitem_id):
        """Delete an order item"""
        try:
            orderitem = OrderItem.query.get_or_404(orderitem_id)
            db.session.delete(orderitem)
            db.session.commit()
            return '', 204
        except Exception as e:
            return self.handle_general_error(e) 