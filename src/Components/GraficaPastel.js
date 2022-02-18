import { Pie } from "react-chartjs-2";

function GraficaPastel({ result }) {
  let labelR = [];
  let dataR = [];
  for (let i = 0; i < result.length; i++) {
    labelR.push(result[i].texto);
    dataR.push(result[i].total);
  }

  var data = {
    labels: labelR,
    datasets: [
      {
        label: "Pregunta",
        data: dataR,
        backgroundColor: [
          "#0a0161",
          "#4749ef",
          "#fe7062",
          "#91b3fa",
          "#6f8fb8",
        ],
      },
    ],
  };

  return <Pie data={data} />;
}
export default GraficaPastel;
