import { useState } from "react";
import Layout from "../components/Layout";
import "./AddSpecies.css";

function AddSpecies() {

  const [form, setForm] = useState({
    nom_commun: "",
    nom_scientifique: "",
    famille: "",
    taille_cm: "",
    poids_min_g: "",
    nb_individus: "",
    longevite_ans: "",
    genre: ""
  });

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(form);
  }

  return (
    <Layout>

      <div className="addspecies-page">

        <div className="species-form-box">

          <div className="form-title">
            AJOUT D'UNE <br/> NOUVELLE ESPECE
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <input
                name="nom_commun"
                placeholder="Nom commun ..."
                onChange={handleChange}
              />

              <input
                name="nom_scientifique"
                placeholder="Nom scientif ..."
                onChange={handleChange}
              />
            </div>

            <div className="form-row">

              <input
                name="famille"
                placeholder="famille ..."
                onChange={handleChange}
              />

              <input
                name="taille_cm"
                placeholder="Taille ..."
                onChange={handleChange}
              />

              <input
                name="poids_min_g"
                placeholder="Poids ..."
                onChange={handleChange}
              />

            </div>

            <div className="form-row">

              <input
                name="nb_individus"
                placeholder="Nmbre ind ..."
                onChange={handleChange}
              />

              <input
                name="longevite_ans"
                placeholder="Esperance ..."
                onChange={handleChange}
              />

              <input
                name="genre"
                placeholder="Especes ..."
                onChange={handleChange}
              />

            </div>

            <button type="submit">Save</button>

          </form>

        </div>

      </div>

    </Layout>
  );
}

export default AddSpecies;