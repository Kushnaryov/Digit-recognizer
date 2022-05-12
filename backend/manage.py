from flask.cli import FlaskGroup

from core import app

cli = FlaskGroup(app)

if __name__ == "__main__":
    cli()
