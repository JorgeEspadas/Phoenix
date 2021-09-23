export default function AdminPage() {
  return (
    <div className="col pt-4">
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
          <a class="nav-link" href="#">
            Modificacion
          </a>
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
