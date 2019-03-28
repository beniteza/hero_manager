from flask import render_template
from flask_mysqldb import MySQL

from dbconfig import DatabaseConfig
from user_status import is_logged_in, is_logged_out
from handler.user_access import User_Access
from handler.users import Users
from handler.heroes import Heroes

from flask_cors import CORS, cross_origin

import os

app = DatabaseConfig()
mysql = MySQL(app)

# cors = CORS(app, resources={r"/*": {"origins": "*"}})
# cors = CORS(app, resources={
#             r"/*": {"origins": "*"}, Access-Control-Allow-Headers: Set-Cookie})
# app.config['Access-Control-Allow-Headers'] = 'Set-Cookie'
# CORS(app, supports_credentials=True, send_wildcard=True)
CORS(app, supports_credentials=True)


@app.route('/')
def index():
    return 'Welcome to the Software Testing Project: Endgame'


@app.route('/about')
def about():
    return 'Software Testing Project: Endgame'


@app.route('/register', methods=['GET', 'POST'])
# @is_logged_out
def register():
    return User_Access().register()


@app.route('/login')
# @is_logged_out
def login_get():
    return User_Access().login_get()


@app.route('/login', methods=['POST'])
# @cross_origin(supports_credentials=True)
# @is_logged_out
def login_post():
    return User_Access().login_post()


@app.route('/logout')
# @is_logged_in
def logout():
    return User_Access().logout()


@app.route('/users')
# @is_logged_in REMOVE LATER
def users():
    return Users().users()


@app.route('/users/<int:id>')
def single_user(id):
    return Users().single_user(id)


@app.route('/user/heroes/<int:id>')
def user_heroes(id):
    return Heroes().user_heroes(id)


@app.route('/collection/add/<int:id>', methods=['POST'])
def add_to_collection(id):
    return Heroes().add_to_collection(id)


@app.route('/collection/<int:id>')
def get_hero_collection(id):
    return Heroes().get_hero_collection(id)


@app.route('/followers/add/<int:id>', methods=['POST'])
def add_follower(id):
    return Users().add_follower(id)


@app.route('/followers/<int:id>')
def get_followers(id):
    return Users().get_followers(id)


@app.route('/heroes')
# @is_logged_in REMOVE LATER
def heroes():
    return Heroes().heroes()


@app.route('/hero/<int:id>')
# @is_logged_in REMOVE LATER
def hero(id):
    return Heroes().hero(id)


@app.route('/hero/<int:id>', methods=['DELETE'])
# @is_logged_in REMOVE LATER
def delete_hero(id):
    return Heroes().delete_hero(id)


@app.route('/hero/<int:id>', methods=['PUT'])
# @is_logged_in REMOVE LATER
def edit_hero(id):
    return Heroes().edit_hero(id)


@app.route('/hero/add', methods=['GET', 'POST'])
# @is_logged_in REMOVE LATER
def add_hero():
    return Heroes().add_hero()


@app.route('/status')
def status():
    return User_Access().status()


if __name__ == '__main__':
    # app.secret_key = 'secret123'
    app.secret_key = os.urandom(24)
    app.run(debug=True)
