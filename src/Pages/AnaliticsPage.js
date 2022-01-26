import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import IMGHome from "../Images/Estadisticas.jpg";
ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["SI", "Mee", "Talvez", "Nel", "NO"],
  datasets: [
    {
      label: "Pregunta",
      data: [12, 19, 3, 5, 2],
      backgroundColor: ["#0a0161", "#4749ef", "#fe7062", "#91b3fa", "#6f8fb8"],
    },
  ],
};

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
          <div className="col-sm-12 col-xl-4" style={{ textAlign: "center" }}>
            <h3>Aqui va la Pregunta 1</h3>
            <Pie data={data} />
          </div>
          <div className="col-sm-12 col-xl-4" style={{ textAlign: "center" }}>
            <h3>Aqui va la Pregunta 2</h3>
            <Pie data={data} />
          </div>
          <div className="col-sm-12 col-xl-4" style={{ textAlign: "center" }}>
            <h3>Aqui va la Pregunta 3</h3>
            <Pie data={data} />
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-sm-12 col-xl-4" style={{ textAlign: "center" }}>
            <h3>Aqui va la Pregunta 4</h3>
            <Pie data={data} />
          </div>
          <div className="col-sm-12 col-xl-4" style={{ textAlign: "center" }}>
            <h3>Aqui va la Pregunta 5</h3>
            <Pie data={data} />
          </div>
          <div className="col-sm-12 col-xl-4" style={{ textAlign: "center" }}>
            <h3>Aqui va la Pregunta 6</h3>
            <Pie data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
