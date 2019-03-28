from flask import render_template, flash, redirect, url_for, session, request, jsonify
from flask_mysqldb import MySQL

from dbconfig import DatabaseConfig
from handler.forms import RegisterForm, HeroForm

import json

app = DatabaseConfig()
mysql = MySQL(app)


class Heroes_DAO:
    def heroes(self):
        # Create cursor
        cur = mysql.connection.cursor()
        # Get heroes
        result = cur.execute("SELECT * FROM heroes")
        heroes = cur.fetchall()  # fetches in dict form
        # Close
        cur.close()
        # return jsonify(heroes)
        return heroes

    def user_heroes(self, id):
        # Create cursor
        cur = mysql.connection.cursor()
        # Get author
        result = cur.execute("SELECT * FROM users WHERE id = %s", [id])
        author = cur.fetchall()  # fetches in dict form

        # Get heroes
        result = cur.execute(
            "SELECT * FROM heroes WHERE author = %s", [author[0]['username']])
        heroes = cur.fetchall()  # fetches in dict form
        # Close
        cur.close()
        # return jsonify(heroes)
        return heroes

    def hero(self, id):
        # Create cursor
        cur = mysql.connection.cursor()
        # Get hero
        result = cur.execute("SELECT * FROM heroes where id = %s", [id])
        hero = cur.fetchall()  # fetches in dict form
        # Close
        cur.close()
        # return jsonify(hero)
        return hero

    def add_hero(self):
        name = request.form['name']
        ability = request.form['ability']
        power = request.form['power']
        author = request.form['author']
        # Create cursor
        cur = mysql.connection.cursor()
        # Execute
        # cur.execute("INSERT INTO heroes(name, ability, power, author) VALUES (%s, %s, %s, %s)",
        #             (name, ability, power, session['username']))
        # CHANGE LATER
        cur.execute("INSERT INTO heroes(name, ability, power, author) VALUES (%s, %s, %s, %s)",
                    (name, ability, power, author))
        # Commit to db
        mysql.connection.commit()

        # Return newly created hero
        cur.execute("SELECT LAST_INSERT_ID();")
        newId = cur.fetchall()[0]['LAST_INSERT_ID()']
        cur.close()

        self.add_to_collection(newId)

        # Close
        return self.hero(newId)

    def edit_hero(self, id):
        name = request.form['name']
        ability = request.form['ability']
        power = request.form['power']
        author = request.form['author']
        # Create cursor
        cur = mysql.connection.cursor()
        # Execute
        cur.execute("UPDATE `heroes` SET `name` = %s, `ability` = %s, `power` = %s, `author` = %s WHERE `id` = %s",
                    (name, ability, power, author, id))
        # Commit to db
        mysql.connection.commit()
        # Close
        cur.close()

        return self.hero(id)

    def delete_hero(self, id):
        # Create cursor
        cur = mysql.connection.cursor()
        # Execute
        cur.execute("DELETE FROM heroes WHERE id = (%s)", [id])
        # Commit to db
        mysql.connection.commit()
        # Close
        cur.close()
        return 'HERO DELETED'

    def add_to_collection(self, id):
        # Doesn't work yet so use hardcoded axvi id = 3
        # follower_id = session['user_id']
        user_id = 3  # axvi

        # Create cursor
        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO hero_collection(user_id, hero_id) VALUES (%s, %s)", (user_id, id))

        # Commit to db
        mysql.connection.commit()

        # Close
        cur.close()

        return 'ADDED HERO TO COLLECTION'

    def get_hero_collection(self, id):
        cur = mysql.connection.cursor()
        result = cur.execute(
            "SELECT * FROM hero_collection where user_id = %s", [id])
        hero_collection = cur.fetchall()  # fetches in dict form
        # Close
        cur.close()
        # return jsonify(hero_collection)
        return hero_collection
