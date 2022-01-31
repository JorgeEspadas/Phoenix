import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { response } from "../Components/PruebaRespuesta";
import GraficaPastel from "../Components/GraficaPastel";
import IMGHome from "../Images/estadisticas.png";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AnaliticsPage() {
  return (
    <div className="col pt-4 px-5">
      <div className="container" id="Objetivo">
        <div className="row align-items-center">
          <div className="col-sm-12 col-xl-8">
            <h1 style={{ color: "var(--main-bg-color)" }}>Estadisticas</h1>
            <p className="lead">
              Estadisticas reales de Empresas e Instituciones en materia de
              Desarrollo de Software.
            </p>
          </div>
          <br />
          <div className="col-sm-12 col-xl-4">
            <img src={IMGHome} style={{ width: "20rem" }}></img>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          {response.map((val, key) => {
            return (
              <div
                className="col-sm-12 col-xl-4 mb-5"
                style={{ textAlign: "center" }}
                key={key}
              >
                <h5>{val.texto}</h5>
                <GraficaPastel result={val.resultados}></GraficaPastel>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
