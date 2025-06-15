# models.py
# This file contains all SQLAlchemy ORM model classes for the e-commerce system.

# Import SQLAlchemy

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Manufacturer model
class Manufacturer(db.Model):
    __tablename__ = 'manufacturer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, unique=True)
    country = db.Column(db.String(120))
    website = db.Column(db.String(255))
    products = db.relationship('Product', backref='manufacturer', lazy=True)

# Product model
class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String)
    manufacturer_id = db.Column(db.Integer, db.ForeignKey('manufacturer.id'), nullable=False)
    order_items = db.relationship('OrderItem', backref='product', lazy=True)

# Customer model
class Customer(db.Model):
    __tablename__ = 'customer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    address = db.Column(db.String(255))
    orders = db.relationship('Order', backref='customer', lazy=True)

# Order model
class Order(db.Model):
    __tablename__ = 'order'
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), default='pending')
    order_items = db.relationship('OrderItem', backref='order', lazy=True)

# OrderItem model (association table)
class OrderItem(db.Model):
    __tablename__ = 'order_item'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1) 