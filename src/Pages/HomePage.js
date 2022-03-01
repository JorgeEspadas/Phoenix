import "../css/HomePage.css";
import IMGHome from "../Images/IMG-HOME.png";
import "animate.css";
import UACAM from "../Images/LOGO-UACAM.png";
import FDI from "../Images/LOGO-FDI.png";
import SEP from "../Images/LOGO-SEP.png";
import { CardGroup, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function HomePage() {

  const [ verMas , setVerMas ] = useState(false);

  const handleClick = () => {
    if(verMas){
      setVerMas(false);
    }else{
      setVerMas(true);
    }
  }
  return (
    <div id="HomePage" className="col pt-4 px-5">
      <div className="container" id="Objetivo">
        <div className="row align-items-center">
          <div className="col-sm-12 col-xl-8">
            <h1 style={{ color: "var(--main-bg-color)" }}>Explora</h1>
            <p className="lead">
            La Industria de Software en la ciudad de San Francisco de Campeche.<br></br>
            Conoce a las pequeñas y medianas Empresas (PYMES),
            las Instituciones Educativas de nivel Superior (IES)
            y una percepción de estudiantes y/o egresados de programas
            educativos en ciencias de la computación para obtener una 
            visión de la Situación actual de la industria del software.

            </p>
            <button className="btn btn-default" href="/#" id="btnVerMas" onClick={handleClick}> 
              Ver más...
            </button>
            {verMas ?
            <p className="lead"><br></br>
              La industria de software se ha convertido actualmente en un mercado potencial en crecimiento.<br></br>
              Particularmente, en la ciudad de San Francisco de Campeche existe la necesidad de impulsar
              nuevos sectores que contribuyan con el desarrollo económico del estado, siendo la industria
              de software una oportunidad indiscutible gracias al incremento del uso de las tecnologías de la información y las comunicaciones.<br></br>
              Las empresas y organizaciones (PYMES) del estado demandan la automatización de sus procesos
              para ser cada vez más productivo, y así, generar una diferencia competitiva en el mercado. <br></br>
              Las PYMES proveedoras de productos de software pretenden ser identificadas, valoradas y 
              convertirse en una industria sólida de la economía de la ciudad.<br></br>
              A su vez, las Instituciones Educativas de nivel Superior (IES) que ofertan programas 
              educativos en ciencias de la computación requieren estrechar sus vínculos con las PYMES para fortalecer
              las competencias genéricas y específicas de sus egresados, contribuyendo a su fácil inserción 
              en el ámbito laboral en la industria del software.

            </p>
            : 
            <p></p>
            }
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
          Esta Observatorio de Software, tiene como propósito el presentar de manera dinámica, el análisis y resultado de Investigaciones realizadas en base a el{" "}
            <strong>
            diagnóstico de la situación actual de la Industria de Software y su vinculación con las Instituciones Educativas de Nivel Superior de la ciudad de San Francisco de Campeche
            </strong>
            , de modo que la información recolectada, permita identificar estrategias que generen oportunidades de crecimiento para las mismas e incluso la creación de nuevas Empresas o Instituciones.
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
                tecnológica y científica del Estado de Campeche.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card border="light">
            <Card.Img variant="top" src={UACAM} />
            <Card.Body>
              <Card.Title>Universidad Autónoma de Campeche</Card.Title>
              <Card.Text>
                Máxima Casa de Estudios del Estado de Campeche, en busca de la
                excelencia.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card border="light">
            <Card.Img variant="top" src={SEP} />
            <Card.Body>
              <Card.Title>Secretaría de Educación Pública</Card.Title>
              <Card.Text>
              La Secretaría de Educación Pública es la institución reguladora de políticas 
              pública en materia de Educación en México. Tiene como propósito esencial crear condiciones que 
              permitan asegurar el acceso de todas las mexicanas y mexicanos a una educación de calidad, 
              en el nivel y modalidad que la requieran y en el lugar donde la demanden.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
}
