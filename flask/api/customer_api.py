# customer_api.py
# This file contains RESTful API endpoints for the Customer resource.

from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from models import db, Customer
from schema import CustomerSchema
from sqlalchemy.exc import IntegrityError
from .base_resource import BaseResource

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)

# inherit BaseResouce class to reuse the error handling methods
class CustomerListResource(BaseResource):
    """Resource for handling customer list operations (GET, POST)"""
    
    def get(self):
        """Get all customers"""
        try:
            customers = Customer.query.all()
            # schema.dump is used for serializing the data
            return customers_schema.dump(customers)
        except Exception as e:
            return self.handle_general_error(e)
    
    def post(self):
        """Create a new customer"""
        try:
            # schema.load is used for deserializing the data
            data = customer_schema.load(request.json)
            customer = Customer(**data)
            db.session.add(customer)
            
            if self.safe_commit():
                return customer_schema.dump(customer), 201
            else:
                return {"error": "Customer email must be unique."}, 400
                
        except ValidationError as e:
            return self.handle_validation_error(e)
        except Exception as e:
            return self.handle_general_error(e)

class CustomerResource(BaseResource):
    """Resource for handling individual customer operations (GET, PUT, DELETE)"""
    
    def get(self, customer_id):
        """Get a single customer"""
        try:
            customer = Customer.query.get(customer_id)
            if not customer:
                return {"error": "Customer not found"}, 404
            return customer_schema.dump(customer)
        except Exception as e:
            return self.handle_general_error(e)
    
    def put(self, customer_id):
        """Update a customer"""
        try:
            data = customer_schema.load(request.json)
            customer = Customer.query.get_or_404(customer_id)
            
            # Update fields
            for key, value in data.items():
                setattr(customer, key, value)
            
            if self.safe_commit():
                return customer_schema.dump(customer)
            else:
                return {"error": "Customer email must be unique."}, 400
                
        except ValidationError as e:
            return self.handle_validation_error(e)
        except Exception as e:
            return self.handle_general_error(e)
    
    def delete(self, customer_id):
        """Delete a customer"""
        try:
            customer = Customer.query.get_or_404(customer_id)
            db.session.delete(customer)
            db.session.commit()
            return '', 204
        except Exception as e:
            return self.handle_general_error(e) 