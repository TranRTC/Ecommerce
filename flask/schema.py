from marshmallow import Schema, fields, validate
from flask import jsonify

class ManufacturerSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1))
    country = fields.Str()
    website = fields.Str()

class ProductSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1))
    price = fields.Float(required=True)
    description = fields.Str()
    manufacturer_id = fields.Int(required=True)
    manufacturer_name = fields.Method('get_manufacturer_name', dump_only=True)

    def get_manufacturer_name(self, obj):
        return obj.manufacturer.name if obj.manufacturer else None

    #def jsonify(self, obj):
        #return jsonify(self.dump(obj))

class CustomerSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Email(required=True)
    address = fields.Str()

    #def jsonify_schema(schema, obj):
        #return jsonify(schema.dump(obj))

class OrderSchema(Schema):
    id = fields.Int(dump_only=True)
    customer_id = fields.Int(required=True)
    order_date = fields.DateTime(required=True)
    status = fields.Str()
    customer_name = fields.Method('get_customer_name', dump_only=True)

    def get_customer_name(self, obj):
        return obj.customer.name if obj.customer else None

class OrderItemSchema(Schema):
    id = fields.Int(dump_only=True)
    order_id = fields.Int(required=True)
    product_id = fields.Int(required=True)
    quantity = fields.Int(required=True)
    product_name = fields.Method('get_product_name', dump_only=True)

    def get_product_name(self, obj):
        return obj.product.name if obj.product else None