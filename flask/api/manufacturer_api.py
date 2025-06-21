# manufacturer_api.py
# This file contains RESTful API endpoints for the Manufacturer resource.

from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from models import db, Manufacturer
from schema import ManufacturerSchema
from sqlalchemy.exc import IntegrityError
from .base_resource import BaseResource

manufacturer_schema = ManufacturerSchema()
manufacturers_schema = ManufacturerSchema(many=True)

class ManufacturerListResource(BaseResource):
    """Resource for handling manufacturer list operations (GET, POST)"""
    
    def get(self):
        """Get all manufacturers"""
        try:
            manufacturers = Manufacturer.query.all()
            return manufacturers_schema.dump(manufacturers)
        except Exception as e:
            return self.handle_general_error(e)
    
    def post(self):
        """Create a new manufacturer"""
        try:
            data = manufacturer_schema.load(request.json)
            manufacturer = Manufacturer(**data)
            db.session.add(manufacturer)
            
            if self.safe_commit():
                return manufacturer_schema.dump(manufacturer), 201
            else:
                return {"error": "Manufacturer name must be unique."}, 400
                
        except ValidationError as e:
            return self.handle_validation_error(e)
        except Exception as e:
            return self.handle_general_error(e)

class ManufacturerResource(BaseResource):
    """Resource for handling individual manufacturer operations (GET, PUT, DELETE)"""
    
    def get(self, manufacturer_id):
        """Get a single manufacturer"""
        try:
            manufacturer = Manufacturer.query.get(manufacturer_id)
            if not manufacturer:
                return {"error": "Manufacturer not found"}, 404
            return manufacturer_schema.dump(manufacturer)
        except Exception as e:
            return self.handle_general_error(e)
    
    def put(self, manufacturer_id):
        """Update a manufacturer"""
        try:
            data = manufacturer_schema.load(request.json)
            manufacturer = Manufacturer.query.get_or_404(manufacturer_id)
            
            # Update fields
            for key, value in data.items():
                setattr(manufacturer, key, value)
            
            if self.safe_commit():
                return manufacturer_schema.dump(manufacturer)
            else:
                return {"error": "Manufacturer name must be unique."}, 400
                
        except ValidationError as e:
            return self.handle_validation_error(e)
        except Exception as e:
            return self.handle_general_error(e)
    
    def delete(self, manufacturer_id):
        """Delete a manufacturer"""
        try:
            manufacturer = Manufacturer.query.get_or_404(manufacturer_id)
            db.session.delete(manufacturer)
            db.session.commit()
            return '', 204
        except Exception as e:
            return self.handle_general_error(e) 