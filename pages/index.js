import "../utils/globals";
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <>
      <Header />

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/id">
            <span className="ms-4 me-2">NovaContact</span>
            <img
              src="/NovaContactLogo.svg"
              alt="NovaContact Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-center"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#objetivo">
                  Objetivo
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#tecnologias">
                  Tecnologías
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#integrantes">
                  Integrantes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contacto">
                  Contacto
                </a>
              </li>
            </ul>
            <a className="btn btn-dark ms-3" href="/login">
              Iniciar sesión
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section con background y mayor altura */}
      <header
        className="text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url(/darkbackground2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          height: "80vh",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Bienvenido a NovaContact</h1>
          <p className="lead">
            Tu herramienta para gestionar contactos de manera eficiente.
          </p>
        </div>
      </header>

      {/* Objetivo */}
      <section id="objetivo" className="py-5 container text-center">
        <h2 className="fw-bold">¿Por qué fue creada esta agenda?</h2>
        <p className="text-muted">
          NovaContact ayuda a organizar y administrar tus contactos personales y
          profesionales de manera segura y accesible.
        </p>
      </section>

      {/* Tecnologías */}
      <section id="tecnologias" className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold">Tecnologías Utilizadas</h2>
          <div
            id="tecnologiasCarousel"
            className="carousel slide mt-4"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/bootstrap-social.png"
                  className="d-block w-100"
                  alt="Bootstrap"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/Firebase-logo.jpg"
                  className="d-block w-100"
                  alt="Firebase"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/Nestjs-logo.jpg"
                  className="d-block w-100"
                  alt="NestJS"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/Nestjs-logo1.jpg"
                  className="d-block w-100"
                  alt="NestJS"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#tecnologiasCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#tecnologiasCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </section>

      {/* Integrantes del Proyecto */}
      <section id="integrantes" className="py-5 container text-center">
        <h2 className="fw-bold">Integrantes del Proyecto</h2>
        <div className="row mt-4">
          {[
            { nombre: "Santiago", rol: "Frontend", imagen: "Santiago.jpeg" },
            { nombre: "Richard", rol: "Backend", imagen: "Richard.jpeg" },
            { nombre: "Elkin", rol: "Tester", imagen: "Elkin.jpeg" },
            {
              nombre: "Cristopher",
              rol: "Documentador Técnico",
              imagen: "Cristopher.jpeg",
            },
          ].map((integrante, index) => (
            <div key={index} className="col-md-3">
              <div className="card shadow-sm">
                <img
                  src={`/${integrante.imagen}`}
                  className="card-img-top"
                  alt={integrante.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{integrante.nombre}</h5>
                  <p className="card-text text-muted">{integrante.rol}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-5 container text-center">
        <h2 className="fw-bold">Contacto</h2>
        <p>
          Si tienes dudas o sugerencias, contáctanos en{" "}
          <a href="mailto:soporte@novacontact.com">soporte@novacontact.com</a>
        </p>
      </section>

      <Footer />
    </>
  );
}
