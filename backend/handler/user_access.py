from flask import jsonify

from dao.user_access_dao import User_Access_DAO


class User_Access:

    def register(self):
        User_Access_DAO().register()
        return 'User Registered'

    def login_get(self):
        User_Access_DAO().login_get()

    def login_post(self):
        user = User_Access_DAO().login_post()
        return jsonify(user)

    def logout(self):
        User_Access_DAO().logout()
        return 'None'

    def status(self):
        result = User_Access_DAO().status()
        return jsonify(result)

    def get_logged_user(self):
        result = User_Access_DAO().get_logged_user()
        if(result == 'INVALID'):
            return result
        return jsonify(result)
