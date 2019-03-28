from flask import jsonify

from dao.heroes_dao import Heroes_DAO


class Heroes:
    def heroes(self):
        heroes = Heroes_DAO().heroes()
        return jsonify(heroes)

    def user_heroes(self, id):
        heroes = Heroes_DAO().user_heroes(id)
        return jsonify(heroes)

    def hero(self, id):
        hero = Heroes_DAO().hero(id)
        return jsonify(hero)

    def add_hero(self):
        hero = Heroes_DAO().add_hero()
        return jsonify(hero)

    def edit_hero(self, id):
        hero = Heroes_DAO().edit_hero(id)
        return jsonify(hero)

    def delete_hero(self, id):
        Heroes_DAO().delete_hero(id)
        return 'HERO DELETED'

    def add_to_collection(self, id):
        Heroes_DAO().add_to_collection(id)
        return 'ADDED HERO TO COLLECTION'

    def get_hero_collection(self, id):
        hero_collection = Heroes_DAO().get_hero_collection(id)
        return jsonify(hero_collection)
