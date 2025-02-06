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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            NovaContact
          </a>
          <img
            src="/NovaContactLogo.svg"
            alt="NovaContact Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-center"
          />
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
            <a className="btn btn-dark ms-3" href="/login">
              Iniciar sesión
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-4">
            Bienvenido a NovaContact
            <img
              src="/NovaContactLogo.svg"
              alt="NovaContact Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-center m-3"
            />
          </h1>
          <p className="lead">
            NovaContact es la herramienta perfecta para gestionar tus contactos.
            En un mundo donde la información está en constante flujo, es
            esencial contar con una plataforma eficiente y accesible. Nuestra
            agenda te permite almacenar, editar y organizar la información de
            tus contactos de manera rápida y sin complicaciones. Los usuarios
            podrán añadir y actualizar fácilmente detalles como nombres,
            direcciones de correo electrónico, números de teléfono, y mucho más.
            Con una interfaz limpia y moderna, esta agenda web está diseñada
            para simplificar tu vida diaria, brindándote acceso a tus contactos
            cuando más lo necesites, sin importar el dispositivo.
          </p>
        </div>
      </header>

      {/* Objetivo */}
      <section id="objetivo" className="py-5 container">
        <h2 className="text-center">¿Por qué fue creada esta agenda?</h2>
        <p className="text-center">
          Esta agenda digital fue desarrollada para ofrecer una forma sencilla y
          rápida de administrar contactos, facilitando su organización y acceso.
          En un mundo tan interconectado, tener todos tus contactos organizados
          y a mano es más importante que nunca. NovaContact fue creada con el
          objetivo de ayudar a las personas a gestionar sus relaciones, tanto
          personales como profesionales, de manera eficiente. Al ofrecer una
          plataforma intuitiva y segura, buscamos que todos los usuarios puedan
          acceder a su información sin dificultad y con la certeza de que está
          almacenada de manera segura.
        </p>
      </section>

      {/* Tecnologías */}
      <section id="tecnologias" className="bg-light py-5">
        <div className="container text-center">
          <h2>Tecnologías Utilizadas</h2>
          <div
            id="tecnologiasCarousel"
            className="carousel slide mt-4"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/next.svg"
                  className="d-block w-100"
                  alt="Bootstrap"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h4>Bootstrap</h4>
                  <p>Framework CSS para diseño web responsivo.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="/Firebase-logo.jpg"
                  className="d-block w-100"
                  alt="Firebase"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h4>Firebase</h4>
                  <p>Base de datos en la nube y autenticación.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="/Nestjs-logo.jpg"
                  className="d-block w-100"
                  alt="NestJS"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h4>NestJS</h4>
                  <p>Backend escalable con TypeScript.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="/Nestjs-logo1.jpg"
                  className="d-block w-100"
                  alt="NestJS"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h4>NestJS</h4>
                  <p>Backend modular y eficiente.</p>
                </div>
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
              <span className="visually-hidden">Previous</span>
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
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-5 container text-center">
        <h2>Contacto</h2>
        <p>
          Si tienes dudas o sugerencias, contáctanos en{" "}
          <a href="mailto:soporte@agendaweb.com">soporte@novacontact.com</a>
        </p>
      </section>
      <Footer />
    </>
  );
}
