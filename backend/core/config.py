import os
from core.src.mcdnn_mnist.load_nn import load_last

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    FLASK_SECRET_KEY = '0sn6ldj83kn5l6bh'
    MODEL = load_last()

