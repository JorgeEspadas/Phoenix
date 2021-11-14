import "../css/HomePage.css";
import IMGHome from "../Images/IMG-HOME.png";
import "animate.css";
import UACAM from "../Images/LOGO-UACAM.png";
import FDI from "../Images/LOGO-FDI.png";
import SEP from "../Images/LOGO-SEP.png";
import { CardGroup, Card } from "react-bootstrap";

export default function HomePage() {
  return (
    <div id="HomePage" className="col pt-4 px-5">
      <div className="container" id="Objetivo">
        <div className="row align-items-center">
          <div className="col-sm-12 col-xl-8">
            <h1 style={{ color: "var(--main-bg-color)" }}>Descubre</h1>
            <p className="lead">
              El mejor lugar para Actualizarte con estadisticas reales de
              Empresas e Instituciones en materia de Desarrollo de Software.
            </p>
            <button className="btn btn-default" href="#" id="btnVerMas">
              Ver mas...
            </button>
          </div>
          <div className="col-sm-12 col-xl-4">
            <img src={IMGHome} style={{ width: "20rem" }}></img>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <h3 style={{ color: "var(--main-bg-color)" }}>
            &nbsp;¿Cuál es nuestro Objetivo?
          </h3>
          <p style={{ padding: "10px" }}>
            Esta Observatorio de Software, tiene como proposito el presentar de
            manera dinamica, el analisis y resultado de Investigaciones
            realizadas en base a el{" "}
            <strong>
              diagnóstico de la situación actual de la Industria de Software y
              su vinculación con las Instituciones Educativas de Nivel Superior
              de la ciudad de San Francisco de Campeche
            </strong>
            , de modo que la informacion recolectada, permita identificar
            estrategias que generen oportunidades de crecimiento para las mismas
            e incluso la creación de nuevas Empresas o Instituciones.
          </p>
        </div>
      </div>
      <hr />
      <div
        className="Instituciones"
        style={{
          padding: "1rem",
        }}
      >
        <h3>&nbsp;Instituciones participantes</h3>
        <CardGroup>
          <Card border="light">
            <Card.Img variant="top" src={FDI} />
            <Card.Body>
              <Card.Title>Facultad de Ingeniería</Card.Title>
              <Card.Text>
                Centro docente de estudios superiores especializados en materia
                tecnologica y científica del Estado de Campeche.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card border="light">
            <Card.Img variant="top" src={UACAM} />
            <Card.Body>
              <Card.Title>Univerdidad Autónoma de Campeche</Card.Title>
              <Card.Text>
                Máxima Casa de Estudios del Estado de Campeche, en busca de la
                excelencia.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card border="light">
            <Card.Img variant="top" src={SEP} />
            <Card.Body>
              <Card.Title>Secretaria de Educación Pública</Card.Title>
              <Card.Text>
                Institución reguladora de politicas publicas en materia de
                Educación, ademas de creacion y sostenibilidad de Escuelas.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
}
