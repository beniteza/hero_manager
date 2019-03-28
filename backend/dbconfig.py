from flask import Flask


def DatabaseConfig():
    app = Flask(__name__)

    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = '123'
    app.config['MYSQL_DB'] = 'testing_db'
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

    return app
