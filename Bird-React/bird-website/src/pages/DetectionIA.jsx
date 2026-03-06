import Layout from "../components/Layout";
import "./DetectionIA.css";

function DetectionIA() {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Modèle IA à connecter plus tard");
  };

  return (
    <Layout>

      <div className="detect-page">

        <div className="detect-block">

          <h2>Détection d'oiseau</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="file"
              className="detect-input"
            />

            <button className="detect-btn">
              Analyser l'image
            </button>

          </form>

          <div className="detect-result">

            <p>Résultat :</p>
            <span>aucun résultat pour le moment</span>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default DetectionIA;