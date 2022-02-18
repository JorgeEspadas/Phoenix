import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import GraficaPastel from "../Components/GraficaPastel";
import IMGHome from "../Images/estadisticas.png";
import IMGError from "../Images/IMG-ERROR.jpg";
import NetworkManager from "../Backend/util/http";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AnaliticsPage() {

  const [lista, setLista] = useState([]);
  const [entidad, setEntidad] = useState();
  const [estadisticas, setEstadisticas] = useState();

  const getLista = async () => {
    let network = new NetworkManager();
    var response = await network.post('api/estadisticas/lista', {});
    if (response.response === "OK") {
      setLista(response.data);
    }
  }

  const getEstadisticas = async () => {
    let network = new NetworkManager();
    if (entidad !== undefined) {
      var response = await network.post('api/estadisticas', { 'entidad': entidad });
      if (response.response === "OK") {
        setEstadisticas(response.data);
      }
    }
  }

  useEffect(() => {
    getEstadisticas();
  }, [entidad]);

  useEffect(() => {
    getLista();
  }, []);

  const handleEntidadConsulta = (e) => {
    setEntidad(e.target.value);
  }

  return (
    <div className="col pt-4 px-5">
      <div className="container" id="Objetivo">
        <div className="row align-items-center">
          <div className="col-sm-12 col-xl-8">
            <h1 style={{ color: "var(--main-bg-color)" }}>Estadísticas</h1>
            <p className="lead">
              Estadísticas reales de Empresas e Instituciones en materia de
              Desarrollo de Software.
            </p>
          </div>
          <br />
          <div className="col-sm-12 col-xl-4">
            <img src={IMGHome} style={{ width: "20rem" }}></img>
          </div>
          <div className="form-group" style={{ width: '350px' }}>
            <Form.Select
              onChange={handleEntidadConsulta}
              id="entidad"
              name="entidad"
              value={entidad}
            >
              <option key="null" disabled selected>Selecciona una IES</option>
              {lista.map((item, i) => {
                return (<><option key={i} value={item.nombre} style={{ color: "var(--main-bg-primary-color)" }}>{item.nombre}</option></>);
              })}

            </Form.Select>
          </div>
        </div>
      </div>
      <br />
      <br />
      {
        (estadisticas !== undefined && estadisticas.total_de_respuestas !== 0) ?
          <div><div className="container">
            <div className="row">
              {estadisticas.metadata.map((val, key) => {
                return (
                  <>
                    {(
                      val.id === "st_9" ||
                      val.id === "st_11" ||
                      val.id === "st_12" ||
                      val.id === "st_13" ||
                      val.id === "st_14" ||
                      val.id === "st_15") ? (
                      <div className="col-sm-12 col-xl-4 mb-5" style={{ textAlign: "center" }} key={key}><h5>{val.texto}</h5>
                        <GraficaPastel result={val.resultados} /></div>
                    ) : <></>}
                  </>);
              })}
            </div>
          </div></div> : <div><center><img src={IMGError} alt="Imagen de Alerta" style={{ width: "20rem" }}></img></center><br/><center><p className="lead">No hay datos para mostrar</p></center></div>
      }
    </div>
  );
}
