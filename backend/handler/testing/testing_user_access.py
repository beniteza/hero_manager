from flask import render_template, flash, redirect, url_for, session, request
from flask_mysqldb import MySQL
from passlib.hash import sha256_crypt

from dbconfig import DatabaseConfig
from handler.forms import RegisterForm, HeroForm

app = DatabaseConfig()
mysql = MySQL(app)


class Testing_User_Access:
    def testing_register(self):
        #Postman Post request
        username = 'John'
        password = '123'
        confirm = '123'

        #Query and get the created user
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT * FROM users WHERE username = %s", [username])
        user = cur.fetchone()
        cur.close()
        # self.assertTrue(result > 0) #User exists
        assertResult = result > 0
        print('USER EXISTS ASSERT: ' + str(assertResult))

        #Compare passwords
        real_password = user['password']
        # self.assertTrue(sha256_crypt.verify(test_password, real_password))
        assertResult = sha256_crypt.verify(password, real_password)
        print('PASSWORDS MATCH ASSERT: ' + str(assertResult))


    def testing_login_post(self):
        #Postman Post request
        username = 'John'
        password = '123'

        assertResult = session['logged_in']
        print('SESSION IS LOGGED IN: ' + str(assertResult))
        assertResult = (session['username'] == username)
        print('CORRECT USER IS LOGGED IN: ' + str(assertResult))

    def testing_logout(self):
        assertResult = 'logged_in' in session
        print('SESSION IS LOGGED OUT: ' + str(not assertResult))
