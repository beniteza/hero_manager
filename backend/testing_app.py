from flask import render_template
from flask_mysqldb import MySQL

from dbconfig import DatabaseConfig
from user_status import is_logged_in, is_logged_out
from handler.user_access import User_Access
from handler.users import Users
from handler.heroes import Heroes

# from handler.testing_users import Testing_Users
from handler.testing.testing_user_access import Testing_User_Access
from handler.testing.testing_heroes import Testing_Heroes

#pip install flask-cors
from flask_cors import CORS, cross_origin

app = DatabaseConfig()
mysql = MySQL(app)

cors = CORS(app, resources={r"/heroes": {"origins": "http://localhost:port"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def index():
    return 'Welcome to the Software Testing Project: Endgame'


@app.route('/about')
def about():
    return 'Software Testing Project: Endgame'


@app.route('/register', methods=['GET', 'POST'])
# @is_logged_out
def testing_register():
    User_Access().register()
    return Testing_User_Access().testing_register()


@app.route('/login')
# @is_logged_out
def login_get():
    return User_Access().login_get()



@app.route('/login', methods=['POST'])
# @is_logged_out
def testing_login_post():
    User_Access().login_post()
    return Testing_User_Access().testing_login_post()


@app.route('/logout')
# @is_logged_in
def testing_logout():
    User_Access().logout()
    return Testing_User_Access().testing_logout()


@app.route('/users')
# @is_logged_in REMOVE LATER
def users():
    return Users().users()

@app.route('/users/<int:id>')
def single_user(id):
    return Users().single_user(id)


@app.route('/heroes')
# @is_logged_in REMOVE LATER
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def heroes():
    return Heroes().heroes()


@app.route('/heroes/<int:id>')
# @is_logged_in REMOVE LATER
def hero(id):
    return Heroes().hero(id)


@app.route('/add_hero', methods=['GET', 'POST'])
# @is_logged_in REMOVE LATER
def testing_add_hero():
    Heroes().add_hero()
    return Testing_Heroes().testing_add_hero()


if __name__ == '__main__':
    app.secret_key = 'secret123'
    app.run(debug=True)
