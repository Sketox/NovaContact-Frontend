import "../utils/globals";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api"; // Importar configuración de Axios
import { Spinner } from "react-bootstrap"; // Importar Spinner de Bootstrap

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga
  const router = useRouter(); // Hook de Next.js para manejar la navegación

  const handleSubmit = async (e) => {
    setLoading(true); // Activar el indicador de carga
    setError(""); // Limpiar errores anteriores
    e.preventDefault();

    // Obtener los valores del formulario
    const fullName = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;

    // Crear un objeto con los datos del formulario
    const formData = {
      fullName,
      password,
      email,
    };

    try {
      // Enviar los datos al servidor usando Axios
      const response = await api.post("/user/createUser", formData);

      // Mostrar la respuesta del servidor
      console.log("Response from server:", response.data);

      // Notificar al usuario que el registro fue exitoso
      alert("Registro exitoso!");

      // Redirigir al usuario a la vista de Login
      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Hubo un error al registrarse, por favor intente de nuevo.");
    } finally {
      setLoading(false); // Desactivar el indicador de carga
    }
  };

  return (
    <>
      <div className="vh-100 d-flex flex-column">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
          </div>
        </nav>

        {/* Título y formulario */}
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow p-4">
                <h1 className="text-center mb-4">
                  Registro
                  <img
                    src="/Satellite.png"
                    alt="Satellite Icon"
                    width="50"
                    height="50"
                    className="d-inline-block align-text-center m-2"
                  />
                </h1>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Ingresa tu nombre de usuario"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Ingresa tu contraseña"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Ingresa tu correo electrónico"
                      required
                    />
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="terms"
                      required
                    />
                    <label className="form-check-label" htmlFor="terms">
                      Acepto los términos y condiciones
                    </label>
                    <div>
                      <a href="#" className="text-dark">
                        Leer términos y condiciones
                      </a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                        />{" "}
                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Header />
    </>
  );
}
