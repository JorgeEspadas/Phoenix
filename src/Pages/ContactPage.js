import IMGHome from "../Images/IMG-INFO.png";
import { CardGroup, Card, ListGroup, ListGroupItem } from "react-bootstrap";

export default function ContactPage() {
  return (
    <div className="col pt-4 px-5">
      <div className="container" id="Objetivo">
        <div className="row align-items-center">
          <div className="col-sm-12 col-xl-8">
            <h1 style={{ color: "var(--main-bg-color)" }}>
              &nbsp;&nbsp; ¿Quienes Somos?
            </h1>
            <p className="lead">
            Somos un Cuerpo Académico que pone a disposición del público en general, información de la Situación actual de la 
            Industria de Software en la Ciudad de San Francisco de Campeche, con respecto a 
            Empresas o Instituciones que desempeñen un papel dentro del ámbito tecnológico.
            </p>
          </div>
          <div className="col-sm-12 col-xl-4">
            <img src={IMGHome} style={{ width: "20rem" }}></img>
          </div>
        </div>
      </div>
      <br />
      <div
        className="CuerpoAcademico"
        style={{
          padding: "1rem",
        }}
      >
        <h3>
          &nbsp;Cuerpo Académico:{" "}
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
          muchos proyectos en los que es participe este cuerpo académico, que es
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
              <ListGroupItem>Jorge Eduardo Espadas Pérez</ListGroupItem>
              <ListGroupItem>Ángel Adiel Morán Tuz</ListGroupItem>
              <ListGroupItem>Maria José González Novelo</ListGroupItem>
            </ListGroup>
          </Card>
          <Card>
            <Card.Header>Analista de Empresas</Card.Header>
            <Card.Body className="text-center">
              <Card.Title>Mtra. Diana Concepción Mex Alvarez</Card.Title>
              <Card.Text>
                Líder del Equipo de Investigación de Empresas de Desarrollo,
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
                Líder del Equipo de Investigación de IES, conformado por:
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush text-center">
              <ListGroupItem>Auria Sonda Mass</ListGroupItem>
              <ListGroupItem>Santos Noe Huchin Mass</ListGroupItem>
            </ListGroup>
          </Card>
        </CardGroup>
      </div>
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
              <Card.Title>
                <a href="mailto:SoporteEmpresas@uacam.mx">
                  SoporteEmpresas@uacam.mx{" "}
                </a>
              </Card.Title>
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
              <Card.Title>
                {" "}
                <a href="mailto:SoporteIES@uacam.mx">SoporteIES@uacam.mx </a>
              </Card.Title>
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
