import os

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:2005@localhost/oiseaux"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = "uploads"