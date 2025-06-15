# manufacturer_api.py
# This file will contain CRUD API endpoints for the Manufacturer resource. 

from flask import Blueprint, request, jsonify, abort
from models import db, Manufacturer
from schema import ManufacturerSchema
from sqlalchemy.exc import IntegrityError

manufacturer_schema = ManufacturerSchema()
manufacturers_schema = ManufacturerSchema(many=True)

manufacturer_bp = Blueprint('manufacturer_bp', __name__)

# POST: Create a new manufacturer
@manufacturer_bp.route('/manufacturers', methods=['POST'])
def create_manufacturer():
    try:
        data = manufacturer_schema.load(request.json)
        manufacturer = Manufacturer(**data)
        db.session.add(manufacturer)
        db.session.commit()
        return jsonify(manufacturer_schema.dump(manufacturer)), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Manufacturer name must be unique."}), 400
    except Exception as err:
        return jsonify({"error": str(err)}), 400

# GET: List all manufacturers
@manufacturer_bp.route('/manufacturers', methods=['GET'])
def get_manufacturers():
    manufacturers = Manufacturer.query.all()
    return jsonify(manufacturers_schema.dump(manufacturers))

# GET: Get a single manufacturer
@manufacturer_bp.route('/manufacturers/<int:manufacturer_id>', methods=['GET'])
def get_manufacturer(manufacturer_id):
    manufacturer = Manufacturer.query.get(manufacturer_id)
    if not manufacturer:
        return jsonify({"error": "Manufacturer not found"}), 404
    return jsonify(manufacturer_schema.dump(manufacturer))

# Update manufacturer
@manufacturer_bp.route('/manufacturers/<int:id>', methods=['PUT'])
def update_manufacturer(id):
    manufacturer = Manufacturer.query.get_or_404(id)
    data = request.get_json()
    manufacturer.name = data.get('name', manufacturer.name)
    manufacturer.country = data.get('country', manufacturer.country)
    manufacturer.website = data.get('website', manufacturer.website)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Manufacturer name must be unique."}), 400
    return jsonify(manufacturer_schema.dump(manufacturer))

# Delete manufacturer
@manufacturer_bp.route('/manufacturers/<int:id>', methods=['DELETE'])
def delete_manufacturer(id):
    manufacturer = Manufacturer.query.get_or_404(id)
    db.session.delete(manufacturer)
    db.session.commit()
    return '', 204 