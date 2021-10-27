import UACAM from "../Images/LOGO-UACAM.png";
import FDI from "../Images/LOGO-FDI.png";
import SEP from "../Images/LOGO-SEP.png";
import {
  CardGroup,
  Card,
  Badge,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { List } from "@material-ui/core";

export default function ContactPage() {
  return (
    <div className="col pt-4 px-5">
      <div
        style={{
          backgroundColor: "var(--main-bs-secundary-color)",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        <h1>&nbsp;&nbsp; ¿Quienes Somos?</h1>
        <p className="lead">
          Somos un Cuerpo Académico que pone a disposicion del publico en
          general, informacion de la Situación actual de la Industria de
          Software en la Ciudad de San Francisco de Campeche, con respecto a
          Empresas o Instituciones que desempeñen un papel dentro del ambito
          tecnológico.
        </p>
      </div>

      <br />
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
      <br />
      <br />
      <div
        className="Objetivo"
        style={{
          backgroundColor: "var(--main-bs-primary-color)",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        <h3>&nbsp;¿Cuál es nuestro Objetivo?</h3>
        <p>
          Esta Observatorio de Software, tiene como proposito el presentar de
          manera dinamica, el analisis y resultado de Investigaciones realizadas
          en base a el{" "}
          <strong>
            diagnóstico de la situación actual de la Industria de Software y su
            vinculación con las Instituciones Educativas de Nivel Superior de la
            ciudad de San Francisco de Campeche
          </strong>
          , de modo que la informacion recolectada, permita identificar
          estrategias que generen oportunidades de crecimiento para las mismas e
          incluso la creación de nuevas Empresas o Instituciones.
        </p>
      </div>
      <br />
      <br />
      <div
        className="CuerpoAcademico"
        style={{
          padding: "1rem",
        }}
      >
        <h3>
          &nbsp;Cuerpo Academico:{" "}
          <span className="text-muted">Ciencias de la Computación </span>
        </h3>
        <p>
          {" "}
          El cuerpo académico “Ciencias de la Computación” impulsa la generación
          y aplicación del conocimiento disciplinario para el desarrollo de
          sistemas computacionales con el fin de contribuir a las necesidades de
          la sociedad.
          <br />
          Busca la formación de Recursos humanos, desarrollo y aplicación de las
          Ciencias de la Computación en los sectores: primario, industrial, de
          servicios y educativo. Por lo que este Observatorio, es uno de los
          muchos proyectos en los que es participe este cuerpo ademico, que es
          formado por los docentes:
        </p>
        <CardGroup>
          <Card>
            <Card.Header>Desarrollo de Software</Card.Header>
            <Card.Body className="text-center">
              <Card.Title>Mtro. José Ramón Cab Chan</Card.Title>
              <Card.Text>
                Lider del Equipo de Desarrollo de Aplicaciones, conformado por:
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush text-center">
              <ListGroupItem>Jorge Eduardo Espadas Perez</ListGroupItem>
              <ListGroupItem>Angel Adiel Moran Tuz</ListGroupItem>
              <ListGroupItem>Maria José González Novelo</ListGroupItem>
            </ListGroup>
          </Card>
          <Card>
            <Card.Header>Analista de Empresas</Card.Header>
            <Card.Body className="text-center">
              <Card.Title>Mtra. Diana Concepción Mex Alvarez</Card.Title>
              <Card.Text>
                Lider del Equipo de Investigación de Empresas de Desarrollo,
                conformado por:
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush text-center">
              <ListGroupItem>Perla Esmeralda Aguileta Gonzalez</ListGroupItem>
              <ListGroupItem>Eduardo Manzanilla Yeh</ListGroupItem>
            </ListGroup>
          </Card>
          <Card>
            <Card.Header>Analista de IES</Card.Header>
            <Card.Body className="text-center">
              <Card.Title>Mtra. Luz María Hernández Cruz</Card.Title>
              <Card.Text>
                Lider del Equipo de Investigación de IES, conformado por:
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush text-center">
              <ListGroupItem>Auria Sonda Mass</ListGroupItem>
              <ListGroupItem>Santos Noe Huchin Mass</ListGroupItem>
            </ListGroup>
          </Card>
        </CardGroup>
      </div>
      <br />
      <br />

      <div
        className="row contacto"
        style={{
          padding: "1rem",
        }}
      >
        <h4>&nbsp;¿Quieres formar parte?</h4>
        <div className="col-sm-12 col-xl-6">
          <Card>
            <Card.Header>Empresas</Card.Header>
            <Card.Body>
              <Card.Title>SoporteEmpresas@uacam.mx</Card.Title>
              <Card.Text>
                ¿Eres una Empresa y estas Interesado?{" "}
                <small className="text-muted">
                  <br />
                  Cualquier duda o sugerencia, contactanos.
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>{" "}
        <br />
        <div className="col-sm-12 col-xl-6">
          <Card>
            <Card.Header>Instituciones de Nivel Superior</Card.Header>
            <Card.Body>
              <Card.Title>SoporteIES@uacam.mx</Card.Title>
              <Card.Text>
                ¿Eres una IES y estas Interesado?{" "}
                <small className="text-muted">
                  <br />
                  Cualquier duda o sugerencia, contactanos.
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
