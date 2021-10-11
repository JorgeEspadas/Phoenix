import React, { useState } from "react";
import {
  Spinner,
  InputGroup,
  FormControl,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import NetworkManager from "../../../Backend/util/http";
import Util from "../../../Backend/util/Util";

function ModifyUser({ snackbar }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmit] = useState(false);
  const [deleteLoading, setDelete] = useState(false);
  const [disableEdit, setEdit] = useState(false);
  const [recoveredData, setData] = useState(null);

  const roles = [
    {
      label: "Publico",
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
    {
      label: "Administrador",
      value: 3,
    },
  ];

  const handleSearchbar = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    let nm = new NetworkManager();
    var local = JSON.parse(localStorage.getItem("user"));
    try {
      setLoading(true);
      await Util.delay(1000);
      var result = await nm.get("admin/cuentas/" + search);
      console.log(result);
      if (result.response === "OK") {
        snackbar("Informacion obtenida");
        setLoading(false);
        setEdit(result.data.email === local.email);
        setData(result.data);
      } else {
        snackbar(result.data.exception.message);
        setLoading(false);
      }
    } catch (error) {
      snackbar(error.toString());
      setLoading(false);
    }
  };

  const handleRolChange = (e) => {
    setData({
      ...recoveredData,
      [e.target.name]: e.target.value,
    });
  };

  const submitBtn = async () => {
    let nm = new NetworkManager();
    var payload = { rol: parseInt(recoveredData.rol, 10) };
    try {
      setSubmit(true);
      await Util.delay(1000);
      console.log(payload);
      var result = await nm.put(
        "admin/cuentas/" + recoveredData.email,
        payload
      );
      if (result.response === "OK") {
        snackbar(result.data.message);
      } else {
        console.log(result.response);
        snackbar("Ocurrio un error");
      }
      setSubmit(false);
    } catch (error) {
      snackbar(error.toString());
      setSubmit(false);
    }
  };

  const deleteBtn = () => {};

  return (
    <div id="AreaModifyUser">
      <h2>
        <i className="fa fa-pencil-square-o"></i>
        &nbsp;Modificar Usuario
      </h2>
      <span style={{ height: "100px" }}></span>
      <div className="form-inline">
        <InputGroup className="mb-3">
          <FormControl
            type="email"
            id="searchEmail"
            name="searchEmail"
            className="form-control px-10"
            onChange={handleSearchbar}
            value={search}
            placeholder="Email del Usuario"
            required
          />
          <Button
            variant="outline-secondary"
            onClick={handleSearch}
            id="button-addon2"
            style={{ width: "73px" }}
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
              "Buscar"
            )}
          </Button>
        </InputGroup>
      </div>
      <hr></hr>
      {recoveredData != null && (
        <div>
          <div className="form-group">
            <label for="nombre">Nombre de la Institución</label>
            <input
              type="text"
              id="nombre"
              autoComplete="off"
              name="nombre"
              className="form-control"
              value={recoveredData.nombre}
              disabled
            />
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
                value={recoveredData.email}
                disabled
              />
            </InputGroup>
          </div>
          <div className="form-group">
            <label for="rol">Asignar Rol</label>
            <Form.Select
              name="rol"
              onChange={handleRolChange}
              disabled={disableEdit}
            >
              {roles.map((rol) => (
                <option
                  key={rol.value}
                  value={rol.value}
                  selected={recoveredData.rol === rol.value}
                >
                  {rol.label}
                </option>
              ))}
            </Form.Select>
          </div>
          {disableEdit && (
            <>
              <Alert variant="warning">
                No puedes Modificar tu Propio Usuario.
              </Alert>
            </>
          )}

          <div id="btnUserModify">
            <button
              type="button"
              class="btn btn-default"
              style={{
                backgroundColor: "var(--main-bg-primary-color)",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={submitBtn}
              disabled={disableEdit}
            >
              {submitLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Guardar"
              )}
            </button>
            <span style={{ height: "10px" }}></span>
            <button
              type="button"
              class="btn btn-default"
              style={{
                backgroundColor: "var(--main-bs-primary-color)",
                color: "var(--main-bg-primary-color)",
                fontWeight: "bold",
              }}
              disabled={disableEdit}
              onClick={deleteBtn}
            >
              {deleteLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Borrar"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModifyUser;
