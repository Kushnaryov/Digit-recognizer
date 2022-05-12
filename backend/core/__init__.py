from flask import Flask
from flask_cors import CORS
from core.src.routes import routes_bp


app = Flask(__name__)

app.config.from_object("core.config.Config")
CORS(app)

app.register_blueprint(routes_bp)
