import React, { useEffect, useState } from "react";
import { Spinner, InputGroup, FormControl, Form } from "react-bootstrap";
import NetworkManager from "../../../Backend/util/http";
import { } from "react-bootstrap";

function CreateUser({ snackbar }) {
  const roles = [
    {
      label: "Estudiante",
      value: 0,
    },
    {
      label: "IES",
      value: 1,
    },
    {
      label: "Empresa",
      value: 2,
    },
  ];

  const [state, setState] = useState({
    nombre: "",
    telefono: "",
    email: "",
    rol: 1,
  });

  const [loading, setLoading] = useState(false);
  const [entidades, setEntidades] = useState([]);
  const [entidad, setEntidad] = useState([]);

  const recibirEntidades = async () => {
    var network = new NetworkManager();
    var response = await network.post("admin/entidad/ver");

    if (response.response === "OK") {
      setEntidades(response.data.llaves);
    }
  };

  useEffect(() => {
    recibirEntidades();
  }, [entidad]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    var network = new NetworkManager();

    console.log(state);
    if(state.rol != 0){
      if (state.email === "" || state.nombre === "" || state.telefono === "") {
        snackbar("Porfavor llena todos los campos");
        return;
      }
    }else{
      if(state.entidad === undefined){
        snackbar("Porfavor selecciona una entidad para el alumno");
        return;
      }
    }
    setLoading(true);

    var payload = {
      nombre: state.nombre,
      email: state.email,
      telefono: state.telefono,
      usos: state.usos,
      rol: state.rol,
      entidad: state.entidad
    };

    var response = await network.post("admin/entidad/generar", payload);
    if (response.response == "OK") {
      setLoading(false);
      setEntidad(response.data.key);
      snackbar("Entidad registrada");
    } else {
      setLoading(false);
      snackbar(response.data.exception.message);
    }
  };

  const handleDelete = async (key) => {
    let network = new NetworkManager();
    var response = await network.post("admin/entidad/borrar", { hash: key });
    if (response.response === "OK") {
      recibirEntidades();
      snackbar("Entidad borrada");
    }
  };

  return (
    <div id="AreaUserCreate">
      <h2>
        <i className="fa fa-user-plus"></i>
        &nbsp;Crear Acceso a Encuesta
      </h2>
      <div className="form-group">
        <label for="nombre">Nombre de la entidad</label>
        <input
          type="text"
          id="nombre"
          autoComplete="off"
          name="nombre"
          className="form-control"
          onChange={handleChange}
          value={state.nombre}
          required
        />
      </div>
      {(state.rol == 0) ?
        <div>
          <div className="form-group">
            <label for="entidad">A qué IES Pertenece</label>
            <Form.Select
              onChange={handleChange}
              id="entidad"
              name="entidad"
              value={state.entidad}
            >
              <option key="null" disabled selected>Selecciona una opción</option>
              {entidades.map((llave, index) => (
                <>
                  {llave.rol === 1 ? <option
                    key={index}
                    value={llave.nombre}
                    style={{ color: "var(--main-bg-primary-color)" }}
                  >
                    {llave.nombre}
                  </option> : <></>}
                </>
              ))}
            </Form.Select>
          </div>
        </div> :
        <div>
          <div className="form-group">
            <label for="telefono">Teléfono de Contacto</label>
            <InputGroup>
              <InputGroup.Text>
                <i
                  className="fa fa-phone"
                  aria-hidden="true"
                  style={{ color: "var(--main-bg-primary-color)" }}
                ></i>
              </InputGroup.Text>
              <FormControl
                type="number"
                id="telefono"
                autoComplete="off"
                name="telefono"
                className="form-control"
                onChange={handleChange}
                value={state.telefono}
                required
              />
            </InputGroup>
          </div>
          <div className="form-group">
            <label for="email">Correo Electrónico</label>
            <InputGroup>
              <InputGroup.Text>
                <i
                  className="fa fa-envelope"
                  aria-hidden="true"
                  style={{ color: "var(--main-bg-primary-color)" }}
                ></i>
              </InputGroup.Text>
              <FormControl
                type="email"
                autoComplete="off"
                id="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={state.email}
                required
              />
            </InputGroup>
          </div>
        </div>}
      <div className="form-group">
        <label for="rol">Rol de la Entidad</label>
        <Form.Select
          onChange={handleChange}
          id="rol"
          name="rol"
          value={state.rol}
        >
          {roles.map((rol) => (
            <option
              key={rol.value}
              value={rol.value}
              style={{ color: "var(--main-bg-primary-color)" }}
            >
              {rol.label}
            </option>
          ))}
        </Form.Select>
      </div>
      {state.rol == 0 ? (
        <div className="form-group">
          <label for="usos">
            Número de veces que puede presentar el cuestionario
          </label>
          <FormControl
            type="number"
            className="form-control"
            id="usos"
            name="usos"
            onChange={handleChange}
            required
          />
        </div>
      ) : (
        <div></div>
      )}
      <div
        id="btnRegistrar"
        className="row"
        style={{ marginLeft: "0.1rem", marginRight: "0.1rem" }}
      >
        <button
          className="btn btn-default"
          style={{
            backgroundColor: "var(--main-bg-primary-color)",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Registrar"
          )}
        </button>
      </div>
      <div style={{ paddingTop: "20px" }}>
        <div className="card" id="AreaUserCreate">
          <h5 className="card-header text-center">Entidades en el sistema</h5>
          <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <center>Entidad</center>
                  </th>
                  <th scope="col">
                    <center>Activo</center>
                  </th>
                  <th scope="col" colSpan={2}>
                    <center>Acciones</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {entidades.map((llave, index) =>
                  llave.rol != 0 ? (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <center>{llave.nombre}</center>
                      </td>
                      <td>
                        {llave.rol != 0
                          ? llave.usos > 0
                            ? "Activo"
                            : "Inactivo"
                          : llave.usos}
                      </td>
                      <td>
                        <center>
                          {llave.rol != 0 ? (
                            llave.usos > 0 ? (                            
                                <>{llave.hash}</>                              
                            ) : (
                              <></>
                            )
                          ) : (
                            <></>
                          )}
                        </center>
                      </td>
                      <td>
                        <center>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(llave.hash)}
                          >
                            Borrar
                          </button>
                        </center>
                      </td>
                    </tr>
                  ) : (
                    <div></div>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "20px" }}>
        <div className="card" id="AreaUserCreate">
          <h5 className="card-header text-center">
            Entidades de Estudiantes en el Sistema
          </h5>
          <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <center>Entidad</center>
                  </th>
                  <th scope="col">
                    <center>Usos Restantes</center>
                  </th>
                  <th scope="col" colSpan={2}>
                    <center>Acciones</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {entidades.map((llave, index) =>
                  llave.rol == 0 ? (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <center>{llave.nombre}</center>
                      </td>
                      <td>
                        <center>{llave.usos}</center>
                      </td>
                      <td>
                        <center>
                        <>{llave.hash}</>
                        </center>
                      </td>
                      <td>
                        <center>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(llave.hash)}
                          >
                            Borrar
                          </button>
                        </center>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
