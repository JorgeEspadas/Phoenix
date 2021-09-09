import "../css/HomePage.css";
import "animate.css";

export default function HomePage() {
  return (
    <div className="contenedorHomePage">
      <div>
        <div className="jumbotron">
          <h1 className="display-4 animate__animated animate__heartBeat">
            Welcome
          </h1>
          <p className="lead my-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <hr className="my-4" />
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <button className="btnHome">Ver mas</button>
        </div>
      </div>
    </div>
  );
}
