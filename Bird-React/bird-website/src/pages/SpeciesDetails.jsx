import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getBirdById } from "../services/api";
import "./SpeciesDetails.css";

function SpeciesDetails() {

  const { id } = useParams();
  const [bird, setBird] = useState(null);

  useEffect(() => {
    getBirdById(id)
      .then(res => {
        setBird(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!bird) {
    return (
      <Layout>
        <p>Chargement...</p>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="species-page">

        <div className="species-left">

          <div className="species-image-box">
            <img
              src={bird.url || "/placeholder.png"}
              alt={bird.nom_commun}
            />
          </div>

          <div className="species-name">
            {bird.nom_commun}
          </div>

        </div>

        <div className="species-right">

          <div className="description-title">
            Description
          </div>

          <div className="description-content">

            <p><b>Nom scientifique :</b> {bird.nom_scientifique}</p>

            <p><b>Famille :</b> {bird.famille || "N/A"}</p>

            <p><b>Taille :</b> {bird.taille_cm ? bird.taille_cm + " cm" : "N/A"}</p>

            <p><b>Poids :</b>
              {bird.poids_min_g && bird.poids_max_g
                ? ` ${bird.poids_min_g} - ${bird.poids_max_g} g`
                : " N/A"}
            </p>

            <p><b>Longévité :</b>
              {bird.longevite_ans ? bird.longevite_ans + " ans" : "N/A"}
            </p>

            <p><b>Population :</b>
              {bird.nb_individus || "N/A"}
            </p>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default SpeciesDetails;