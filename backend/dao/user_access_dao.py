from flask import render_template, flash, redirect, url_for, session, request, jsonify
from flask_mysqldb import MySQL
from passlib.hash import sha256_crypt

from dbconfig import DatabaseConfig
from handler.forms import RegisterForm, HeroForm

app = DatabaseConfig()
mysql = MySQL(app)


class User_Access_DAO:

    def register(self):
        form = RegisterForm(request.form)
        if request.method == 'POST' and form.validate():
            # if form is submited
            username = form.username.data
            password = sha256_crypt.encrypt(str(form.password.data))

            cur = mysql.connection.cursor()
            cur.execute(
                "INSERT INTO users(username, password) VALUES (%s, %s)", (username, password))
            mysql.connection.commit()
            cur.close()
        return 'User Registered'

    def login_get(self):
        pass

    def login_post(self):
        username = request.form['username']
        password_candidate = request.form['password']

        # Create cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute(
            "SELECT * FROM users WHERE username = %s", [username])

        user = {}

        if result > 0:  # if rows are found
            # Get stored hash
            user = cur.fetchone()

            cur.close()  # Close connection

            password = user['password']
            id = user['id']

        # Compare passwords
            if sha256_crypt.verify(password_candidate, password):
                # Passed
                session['logged_in'] = True
                session['username'] = username
                session['id'] = id
            else:
                return 'INVALID'
        else:
            return 'INVALID'

        return user

    def logout(self):
        print(session)
        session.clear()
        return 'None'

    def status(self):
        if 'logged_in' in session:
            # return jsonify(True)
            return True
        else:
            # return jsonify(False)
            return False
