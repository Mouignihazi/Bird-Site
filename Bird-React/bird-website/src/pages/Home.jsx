import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getBirds } from "../services/api";
import "./Home.css";

function Home() {
  const [birds, setBirds] = useState([]);
  const [minSize, setMinSize] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [minLongevity, setMinLongevity] = useState("");
  const [family, setFamily] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getBirds()
      .then((res) => {
        setBirds(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredBirds = birds.filter((bird) => {
    if (minSize && bird.taille_cm < minSize) return false;
    if (minWeight && bird.poids_min_g < minWeight) return false;
    if (maxWeight && bird.poids_max_g > maxWeight) return false;
    if (minLongevity && bird.longevite_ans < minLongevity) return false;
    if (family && !bird.famille?.toLowerCase().includes(family.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="home-container">
        <div className="filters-box">
          <h3>Filtres</h3>
          <label>Taille minimale</label>
          <input type="number" value={minSize} onChange={(e) => setMinSize(e.target.value)} placeholder="En cm" />
          <label>Poids minimal</label>
          <input type="number" value={minWeight} onChange={(e) => setMinWeight(e.target.value)} placeholder="En g" />
          <label>Poids maximal</label>
          <input type="number" value={maxWeight} onChange={(e) => setMaxWeight(e.target.value)} placeholder="En g" />
          <label>Longévité minimale</label>
          <input type="number" value={minLongevity} onChange={(e) => setMinLongevity(e.target.value)} placeholder="En années" />
          <label>Famille</label>
          <input type="text" value={family} onChange={(e) => setFamily(e.target.value)} placeholder="Ex: Accipitridae" />
        </div>

        <div className="cards-area">
          {filteredBirds.map((bird) => (
            <div
              key={bird.id}
              className="bird-card"
              onClick={() => navigate(`/species/${bird.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={bird.url || "/placeholder.png"} alt={bird.nom_commun} />
              <p>{bird.nom_commun}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
