import { NavLink } from "react-router-dom";

export default function AdminPage() {
  return (
    <div style={{ padding: "2%" }}>
      <h1>Administrador</h1>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            Configuracion
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Usuarios
          </a>
        </li>
        <li class="nav-item">
          <NavLink  exact to="/agregar-pregunta" class="nav-link" href="#">
            Modificacion
          </NavLink>
        </li>
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >
            ??
          </a>
        </li>
      </ul>
    </div>
  );
}
