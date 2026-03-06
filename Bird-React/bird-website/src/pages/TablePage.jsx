import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getBirds } from "../services/api";
import "./TablePage.css";

function TablePage() {

  const [birds, setBirds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBirds().then(res => setBirds(res.data));
  }, []);

  return (

    <Layout>

      <div className="table-page">

        <div className="table-container">

          <h2>Table descriptif des oiseaux</h2>

          <table>

            <thead>
              <tr>
                <th>Espèce</th>
                <th>Nombre d’individus</th>
                <th>Longévité</th>
                <th>Taille</th>
                <th>Poids</th>
              </tr>
            </thead>

            <tbody>

              {birds.map((bird) => (

                <tr
                  key={bird.id}
                  onClick={() => navigate(`/species/${bird.id}`)}
                  style={{ cursor: "pointer" }}
                >

                  <td>{bird.nom_commun}</td>

                  <td>{bird.nb_individus || "N/A"}</td>

                  <td>
                    {bird.longevite_ans
                      ? bird.longevite_ans + " ans"
                      : "N/A"}
                  </td>

                  <td>
                    {bird.taille_cm
                      ? bird.taille_cm + " cm"
                      : "N/A"}
                  </td>

                  <td>
                    {bird.poids_min_g && bird.poids_max_g
                      ? bird.poids_min_g + " à " + bird.poids_max_g + " g"
                      : "N/A"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>

  );
}

export default TablePage;