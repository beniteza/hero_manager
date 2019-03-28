from flask import render_template, flash, redirect, url_for, session, request, jsonify
from flask_mysqldb import MySQL
from passlib.hash import sha256_crypt

from dbconfig import DatabaseConfig
from handler.forms import RegisterForm, HeroForm

app = DatabaseConfig()
mysql = MySQL(app)


class User_Access:

    def register(self):
        form = RegisterForm(request.form)
        if request.method == 'POST' and form.validate():
            # if form is submited
            username = form.username.data
            password = sha256_crypt.encrypt(str(form.password.data))

            # create cursor
            cur = mysql.connection.cursor()

            # execute query
            cur.execute(
                "INSERT INTO users(username, password) VALUES (%s, %s)", (username, password))

            # commit to db
            mysql.connection.commit()

            # close connection
            cur.close()

            # # flash msg
            # flash('You are now registered and can log in', 'success')

            # return redirect(url_for('login_get'))

        # return render_template('register.html', form=form)
        return 'User Registered'

    def login_get(self):
        # return render_template('login.html')
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

        # Compare passwords
            if sha256_crypt.verify(password_candidate, password):
                # Passed
                session['logged_in'] = True
                session['username'] = username
                # session.permanent = 'logged_in' in session
                # session.modified = True
                print(session)

                # flash('You are now logged in', 'success')
        #         return redirect(url_for('users'))
        #     else:
        #         error = 'Invalid login'
        #         return render_template('login.html', error=error)
        # else:
        #     error = 'Username not found'
        #     return render_template('login.html', error=error)

        # return redirect(url_for('login_get'))
        # return 'The user ' + username + ' was logged in'
        # return jsonify(logged_user)
        # return session['username']
        # session.save()
        # session.persist()
        return jsonify(user)

    def logout(self):
        print(session)
        session.clear()
        return 'None'

    def status(self):
        print('\n\n')
        print('Status Get')
        print('logged_in' in session)
        print('username' in session)
        print('\n\n')
        if 'logged_in' in session:
            return jsonify(True)
        else:
            return jsonify(False)
