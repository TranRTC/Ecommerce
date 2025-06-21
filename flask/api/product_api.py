# product_api.py
# This file contains RESTful API endpoints for the Product resource.

from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from models import db, Product
from schema import ProductSchema
from sqlalchemy.exc import IntegrityError
from .base_resource import BaseResource

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

class ProductListResource(BaseResource):
    """Resource for handling product list operations (GET, POST)"""
    
    def get(self):
        """Get all products"""
        try:
            products = Product.query.all()
            return products_schema.dump(products)
        except Exception as e:
            return self.handle_general_error(e)
    
    def post(self):
        """Create a new product"""
        try:
            data = product_schema.load(request.json)
            product = Product(**data)
            db.session.add(product)
            
            if self.safe_commit():
                return product_schema.dump(product), 201
            else:
                return {"error": "Product creation failed. Check manufacturer_id."}, 400
                
        except ValidationError as e:
            return self.handle_validation_error(e)
        except Exception as e:
            return self.handle_general_error(e)

class ProductResource(BaseResource):
    """Resource for handling individual product operations (GET, PUT, DELETE)"""
    
    def get(self, product_id):
        """Get a single product"""
        try:
            product = Product.query.get(product_id)
            if not product:
                return {"error": "Product not found"}, 404
            return product_schema.dump(product)
        except Exception as e:
            return self.handle_general_error(e)
    
    def put(self, product_id):
        """Update a product"""
        try:
            data = product_schema.load(request.json)
            product = Product.query.get_or_404(product_id)
            
            # Update fields
            for key, value in data.items():
                setattr(product, key, value)
            
            if self.safe_commit():
                return product_schema.dump(product)
            else:
                return {"error": "Product update failed. Check manufacturer_id."}, 400
                
        except ValidationError as e:
            return self.handle_validation_error(e)
        except Exception as e:
            return self.handle_general_error(e)
    
    def delete(self, product_id):
        """Delete a product"""
        try:
            product = Product.query.get_or_404(product_id)
            db.session.delete(product)
            db.session.commit()
            return '', 204
        except Exception as e:
            return self.handle_general_error(e) 