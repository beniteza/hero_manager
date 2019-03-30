from flask import session
from flask_mysqldb import MySQL

from dbconfig import DatabaseConfig

app = DatabaseConfig()
mysql = MySQL(app)


class Users_DAO:
    def users(self):
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT * FROM users")
        users = cur.fetchall()
        cur.close()
        return users

    def single_user(self, id):
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT * FROM users where id = %s", [id])
        user = cur.fetchall()
        cur.close()
        return user

    def add_follower(self, id):
        follower_id = session['id']

        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO followers(user_id, follower_id) VALUES (%s, %s)", (id, follower_id))
        mysql.connection.commit()
        cur.close()

        return 'NOW FOLLOWING USER'

    def get_followers(self, id):
        cur = mysql.connection.cursor()
        result = cur.execute(
            "SELECT * FROM followers where user_id = %s", [id])
        users = cur.fetchall()
        cur.close()
        return users
