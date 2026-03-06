import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getBirds } from "../services/api";
import "./AddImage.css";

function AddImage() {

  const [birds, setBirds] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBird, setSelectedBird] = useState(null);

  useEffect(() => {
    getBirds().then(res => setBirds(res.data));
  }, []);

  const filteredBirds = birds.filter(bird =>
    bird.nom_commun.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>

      <div className="add-image-page">

        <div className="upload-block">

          <h2>Ajouter une image</h2>

          <input
            type="file"
            className="file-input"
          />

          <input
            type="text"
            placeholder="Nom de l'auteur"
            className="author-input"
          />

          <div className="selected-bird">
            Espèce sélectionnée :
            {selectedBird
              ? ` ${selectedBird.nom_commun}`
              : " aucune"}
          </div>

          <button className="upload-btn">
            Ajouter l'image
          </button>

        </div>


        <div className="select-bird-block">

          <h2>Choisir une espèce</h2>

          <input
            type="text"
            placeholder="Rechercher un oiseau..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="bird-list">

            {filteredBirds.map(bird => (

              <div
                key={bird.id_espece}
                className={`bird-item ${
                  selectedBird?.id_espece === bird.id_espece
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedBird(bird)}
              >
                {bird.nom_commun}
              </div>

            ))}

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default AddImage;