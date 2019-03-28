from flask import render_template, flash, redirect, url_for, session, request, jsonify
from flask_mysqldb import MySQL

from dbconfig import DatabaseConfig
from handler.forms import RegisterForm, HeroForm

app = DatabaseConfig()
mysql = MySQL(app)


class Testing_Heroes:
    def testing_add_hero(self):
        #Postman Post request
        name = 'Venom'
        ability = 'Symbiote'
        power = '5000'

        # Create cursor
        cur = mysql.connection.cursor()
        # Get hero
        result = cur.execute("SELECT * FROM heroes where name = %s", [name])
        hero = cur.fetchall()  # fetches in dict form
        # Close
        cur.close()

        assertResult = result > 0
        print('HERO EXISTS ASSERT: ' + str(assertResult))

        assertResult = hero['ability'] == ability
        print('ABILITY MATCHES ASSERT: ' + str(assertResult))

        assertResult = hero['power'] == power
        print('POWER MATCHES ASSERT: ' + str(assertResult))

        assertResult = hero['author'] == session['username']
        print('ABILITY MATCHES ASSERT: ' + str(assertResult))
