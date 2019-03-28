from dao.users_dao import Users_DAO
from flask import render_template, flash, redirect, url_for, session,  request, jsonify
from flask_mysqldb import MySQL

from dbconfig import DatabaseConfig

app = DatabaseConfig()
mysql = MySQL(app)


class Users:
    def users(self):
        # # Create cursor
        # cur = mysql.connection.cursor()
        # # Get heroes
        # result = cur.execute("SELECT * FROM users")
        # users = cur.fetchall()  # fetches in dict form
        # # Close
        # cur.close()
        users = Users_DAO().users()
        return jsonify(users)

    def single_user(self, id):
        # # Create cursor
        # cur = mysql.connection.cursor()
        # # Get hero
        # result = cur.execute("SELECT * FROM users where id = %s", [id])
        # user = cur.fetchall()  # fetches in dict form
        # # Close
        # cur.close()
        user = Users_DAO().single_user(id)
        return jsonify(user)

    def add_follower(self, id):
        # # Doesn't work yet so use hardcoded axvi id = 3
        # # follower_id = session['user_id']
        # follower_id = 3  # axvi

        # # Create cursor
        # cur = mysql.connection.cursor()
        # cur.execute(
        #     "INSERT INTO followers(user_id, follower_id) VALUES (%s, %s)", (id, follower_id))

        # # Commit to db
        # mysql.connection.commit()

        # # Close
        # cur.close()

        return Users_DAO().add_follower(id)

    def get_followers(self, id):
        # cur = mysql.connection.cursor()
        # result = cur.execute(
        #     "SELECT * FROM followers where user_id = %s", [id])
        # users = cur.fetchall()  # fetches in dict form
        # # Close
        # cur.close()
        followers = Users_DAO().get_followers(id)
        return jsonify(followers)
