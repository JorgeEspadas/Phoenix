import React, { useState } from "react";
import { Spinner, InputGroup, FormControl, Form } from "react-bootstrap";
import NetworkManager from "../../../Backend/util/http";
import Util from "../../../Backend/util/Util";
import { } from "react-bootstrap";

function CreateUser({ snackbar }) {
  const roles = [
    {
      label: "IES",
      value: 1,
    },
    {
      label: "Empresa",
      value: 2,
    },
    {
      label: "Administrador",
      value: 3,
    },
  ];

  const [state, setState] = useState({
    email: "",
    nombre: "",
    rol: roles[0].value,
    password: "",
    passwordConfirmation: "",
    telefono: "",
  });

  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setState({
      email: "",
      nombre: "",
      rol: roles[0].value,
      password: "",
      passwordConfirmation: "",
      telefono: "",
    });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let nm = new NetworkManager();
    setLoading(true);
    if (
      state.password === state.passwordConfirmation &&
      state.password.length >= 6 &&
      state.passwordConfirmation.length >= 6
    ) {
      var payload = {
        nombre: state.nombre,
        email: state.email,
        password: Util.Hash(state.password),
        rol: state.rol,
        telefono: state.telefono,
      };

      await Util.delay(1000);
      var result = await nm.post("admin/cuentas", payload);
      if (result.response === "OK") {
        //limpiamos el estado
        resetState();
        //mostramos snackbar
        setLoading(false);
        snackbar(result.data.message);
      } else {
        //mostramos snackbar igual por que algo fallo alaverga.
        setLoading(false);
        snackbar(result.data.exception.message);
      }
    } else {
      // snackbar, las contrasenas no coinciden?
      setLoading(false);
      if (
        state.password.length < 6 &&
        state.password != state.passwordConfirmation
      ) {
        snackbar(
          "Las contrasenas debe tener 6 o mas caracteres y deben coincidir!"
        );
      } else {
        snackbar("La contrasena debe tener mas de 6 caracteres");
      }
    }
  };

  return (
    <div id="AreaUserCreate">
      <h2>
        <i className="fa fa-user-plus"></i>
        &nbsp;Crea Usuario
      </h2>
      <div className="form-group">
        <label for="nombre">Nombre de la institución</label>
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
            type="text"
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
      <div className="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          autoComplete="off"
          id="password"
          name="password"
          className="form-control"
          onChange={handleChange}
          value={state.password}
          required
        />
        <small id="passwordInfo" class="form-text text-muted">
          Debe tener al menos 6 caracteres.
        </small>
      </div>
      <div className="form-group">
        <label for="passwordConfirmation">Confirmar Contraseña</label>
        <input
          type="password"
          autoComplete="off"
          id="passwordConfirmation"
          name="passwordConfirmation"
          className="form-control"
          onChange={handleChange}
          value={state.passwordConfirmation}
          required
        />
      </div>
      <div className="form-group">
        <label for="rol">Asignar Rol </label>
        <Form.Select onChange={handleChange} id="rol" name="rol" value={state.rol}>
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
    </div>
  );
}

export default CreateUser;
