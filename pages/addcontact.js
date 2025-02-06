import "../utils/globals";
import Footer from "../components/footer";
import { useRouter } from "next/router";
import { useState } from "react";
import api from "../utils/api"; // Importar configuración de Axios
import { Spinner } from "react-bootstrap"; // Importar Spinner de Bootstrap

export default function AddContact() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga
  const router = useRouter();

  const validateName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };

  const validateNumber = (number) => {
    return /^\d{10,13}$/.test(number);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    setLoading(true); // Activar el indicador de carga
    setError(""); // Limpiar errores anteriores
    e.preventDefault();

    // Obtener los valores del formulario
    const name = e.target.name.value.trim();
    const number = e.target.number.value.trim();
    const email = e.target.email.value.trim();
    const notes = e.target.notes.value;

    // Validaciones
    if (!validateName(name)) {
      setError("El nombre solo puede contener letras sin espacios.");
      setLoading(false);
      return;
    }

    if (!validateNumber(number)) {
      setError("El número solo debe contener entre 10 a 13 dígitos.");
      setLoading(false);
      return;
    }

    if (email && !validateEmail(email)) {
      setError("Ingrese un correo electrónico válido.");
      setLoading(false);
      return;
    }

    // Obtener el userId desde localStorage
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    if (!userId) {
      alert(
        "No se encontró el ID de usuario. Por favor, inicie sesión nuevamente."
      );
      return;
    }

    // Crear un objeto con los datos del formulario
    const contactData = {
      userId, // Incluimos el ID del usuario
      name,
      number,
      email,
      notes,
    };

    try {
      // Enviar los datos al servidor usando Axios
      const response = await api.post("/tutorial/createData", contactData);
      alert("¡Contacto añadido exitosamente!");
      window.location.href = "/contacts";
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Hubo un error al añadir el contacto, por favor intente de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <span className="ms-4 me-2">NovaContact</span>
            <img
              src="/NovaContactLogo.svg"
              alt="NovaContact Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-center"
            />
          </a>
          <a href="/contacts" className="btn btn-dark me-4" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" />{" "}
                Cargando...
              </>
            ) : (
              "Contactos"
            )}
          </a>
        </div>
      </nav>

      {/* Título y formulario */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h1 className="text-center mb-4">
                Agregar contactos
                <img
                  src="/Spacegun.png"
                  alt="Spacegun Icon"
                  width="50"
                  height="50"
                  className="d-inline-block align-text-center m-2"
                />
              </h1>
              {/* Área de imagen */}
              <div className="text-center mb-4">
                <div className="border rounded p-4 d-inline-block">
                  <i className="bi bi-image fs-1"></i>
                </div>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    Número
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Notas
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    rows="3"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-dark w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                    />
                  ) : (
                    "Agregar contacto"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
