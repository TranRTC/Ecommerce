# base_resource.py
# Base resource class with common functionality

from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from models import db

class BaseResource(Resource):
    """Base resource class with common error handling and utilities"""
    
    def handle_validation_error(self, error):
        """Handle validation errors consistently"""
        return {"error": error.messages}, 400
    
    def handle_integrity_error(self, error):
        """Handle database integrity errors"""
        db.session.rollback()
        return {"error": "Data integrity error. Check your input."}, 400
    
    def handle_general_error(self, error):
        """Handle general errors"""
        db.session.rollback()
        return {"error": str(error)}, 400
    
    def safe_commit(self):
        """Safely commit database changes with error handling"""
        try:
            db.session.commit()
            return True
        except IntegrityError as e:
            db.session.rollback()
            return False 