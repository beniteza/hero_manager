from dao.users_dao import Users_DAO
from flask import jsonify


class Users:
    def users(self):
        users = Users_DAO().users()
        return jsonify(users)

    def single_user(self, id):
        user = Users_DAO().single_user(id)
        return jsonify(user)

    def add_follower(self, id):
        return Users_DAO().add_follower(id)

    def get_followers(self, id):
        followers = Users_DAO().get_followers(id)
        return jsonify(followers)
