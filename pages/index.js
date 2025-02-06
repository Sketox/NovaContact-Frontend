import "../utils/globals";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  return (
    <>
      <Header />
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Agenda Web
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
                <a className="nav-link" href="#contacto">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-4">Bienvenido a Agenda Web</h1>
          <p className="lead">
            Una aplicación moderna para gestionar tus contactos de manera
            eficiente.
          </p>
        </div>
      </header>

      {/* Objetivo */}
      <section id="objetivo" className="py-5 container">
        <h2 className="text-center">¿Por qué fue creada esta agenda?</h2>
        <p className="text-center">
          Esta agenda digital fue desarrollada para ofrecer una forma sencilla y
          rápida de administrar contactos, facilitando su organización y acceso.
        </p>
      </section>

      {/* Tecnologías */}
      <section id="tecnologias" className="bg-light py-5">
        <div className="container text-center">
          <h2>Tecnologías Utilizadas</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <h4>NestJS</h4>
              <p>Backend escalable con TypeScript.</p>
            </div>
            <div className="col-md-4">
              <h4>Next.js</h4>
              <p>Framework para el frontend con React.</p>
            </div>
            <div className="col-md-4">
              <h4>Firebase</h4>
              <p>Base de datos en la nube y autenticación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-5 container text-center">
        <h2>Contacto</h2>
        <p>
          Si tienes dudas o sugerencias, contáctanos en{" "}
          <a href="mailto:soporte@agendaweb.com">soporte@agendaweb.com</a>
        </p>
      </section>
      <Footer />
    </>
  );
}
