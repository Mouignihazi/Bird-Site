from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date
import os
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db = SQLAlchemy(app)
app.config['CORS_HEADERS'] = 'Content-Type'


class Taxonomie(db.Model):
    __tablename__ = "taxonomie"
    id_taxonomie = db.Column(db.Integer, primary_key=True)
    ordre = db.Column(db.String(100))
    famille = db.Column(db.String(100))
    genre = db.Column(db.String(100))


class Espece(db.Model):
    __tablename__ = "espece"
    id_espece = db.Column(db.Integer, primary_key=True)
    nom_commun = db.Column(db.String(150), nullable=False)
    nom_scientifique = db.Column(db.String(150), nullable=False)
    id_taxonomie = db.Column(db.Integer, db.ForeignKey("taxonomie.id_taxonomie"))


class Caracteristique(db.Model):
    __tablename__ = "caracteristique"
    id_caracteristique = db.Column(db.Integer, primary_key=True)
    taille_cm = db.Column(db.Integer)
    poids_min_g = db.Column(db.Integer)
    poids_max_g = db.Column(db.Integer)
    longevite_ans = db.Column(db.Integer)
    id_espece = db.Column(db.Integer, db.ForeignKey("espece.id_espece"), unique=True)


class Population(db.Model):
    __tablename__ = "population"
    id_population = db.Column(db.Integer, primary_key=True)
    nb_individus = db.Column(db.Integer)
    date_estimation = db.Column(db.Date)
    id_espece = db.Column(db.Integer, db.ForeignKey("espece.id_espece"))


class Auteur(db.Model):
    __tablename__ = "auteur"
    id_auteur = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(150))
    email = db.Column(db.String(150))


class Image(db.Model):
    __tablename__ = "image"
    id_image = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Text)
    date_upload = db.Column(db.Date)
    id_espece = db.Column(db.Integer, db.ForeignKey("espece.id_espece"))
    id_auteur = db.Column(db.Integer, db.ForeignKey("auteur.id_auteur"))


# Ajouter une espèce
@app.route("/species", methods=["POST"])
def add_species():
    data = request.json

    new_species = Espece(
        nom_commun=data["nom_commun"],
        nom_scientifique=data["nom_scientifique"],
        id_taxonomie=data["id_taxonomie"]
    )
    db.session.add(new_species)
    db.session.commit()

    new_carac = Caracteristique(
        taille_cm=data["taille_cm"],
        poids_min_g=data["poids_min_g"],
        poids_max_g=data["poids_max_g"],
        longevite_ans=data["longevite_ans"],
        id_espece=new_species.id_espece
    )
    db.session.add(new_carac)

    new_population = Population(
        nb_individus=data["nb_individus"],
        date_estimation=date.today(),
        id_espece=new_species.id_espece
    )
    db.session.add(new_population)

    db.session.commit()

    return jsonify({"message": "Espèce ajoutée"}), 201


# Récupérer toutes les espèces (avec tri)
@app.route("/species", methods=["GET"])
@app.route("/species", methods=["GET"])
def get_species():
    results = db.session.query(
        Espece,
        Caracteristique,
        Taxonomie,
        Population
    ).join(
        Caracteristique, Espece.id_espece == Caracteristique.id_espece
    ).join(
        Taxonomie, Espece.id_taxonomie == Taxonomie.id_taxonomie
    ).outerjoin(
        Population, Espece.id_espece == Population.id_espece
    ).all()

    data = []

    for espece, carac, taxo, pop in results:

        image = Image.query.filter_by(id_espece=espece.id_espece).first()

        data.append({
            "id": espece.id_espece,
            "nom_commun": espece.nom_commun,
            "nom_scientifique": espece.nom_scientifique,

            "famille": taxo.famille,

            "taille_cm": carac.taille_cm,
            "poids_min_g": carac.poids_min_g,
            "poids_max_g": carac.poids_max_g,
            "longevite_ans": carac.longevite_ans,

            "nb_individus": pop.nb_individus if pop else None,

            "url": image.url if image else None
        })

    return jsonify(data)


# Récupérer une espèce
@app.route("/species/<int:id>", methods=["GET"])
def get_one_species(id):

    espece = Espece.query.get_or_404(id)
    carac = Caracteristique.query.filter_by(id_espece=id).first()
    taxo = Taxonomie.query.get(espece.id_taxonomie)
    pop = Population.query.filter_by(id_espece=id).first()
    image = Image.query.filter_by(id_espece=id).first()

    return jsonify({
        "id": espece.id_espece,
        "nom_commun": espece.nom_commun,
        "nom_scientifique": espece.nom_scientifique,

        "famille": taxo.famille if taxo else None,

        "taille_cm": carac.taille_cm if carac else None,
        "poids_min_g": carac.poids_min_g if carac else None,
        "poids_max_g": carac.poids_max_g if carac else None,
        "longevite_ans": carac.longevite_ans if carac else None,

        "nb_individus": pop.nb_individus if pop else None,

        "url": image.url if image else None
    })

# Supprimer une espèce
@app.route("/species/<int:id>", methods=["DELETE"])
def delete_species(id):
    espece = Espece.query.get_or_404(id)
    db.session.delete(espece)
    db.session.commit()
    return jsonify({"message": "Espèce supprimée"})


# Ajouter une image
@app.route("/species/<int:id>/images", methods=["POST"])
def add_image(id):
    data = request.json

    new_image = Image(
        url=data["url"],
        date_upload=date.today(),
        id_espece=id,
        id_auteur=data["id_auteur"]
    )

    db.session.add(new_image)
    db.session.commit()

    return jsonify({"message": "Image ajoutée"}), 201



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)