import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter(); // Hook de Next.js para manejar la navegación

  const handleSubmit = async (e) => {
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
      const response = await axios.post(
        "https://0066-2800-bf0-a40c-125a-f8d9-77b7-6277-4a9d.ngrok-free.app/user/createUser",
        formData
      );

      // Mostrar la respuesta del servidor
      console.log("Response from server:", response.data);

      // Notificar al usuario que el registro fue exitoso
      alert("Registro exitoso!");

      // Redirigir al usuario a la vista de Login
      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Hubo un error al registrarse, por favor intente de nuevo.");
    }
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
        </div>
      </nav>

      {/* Título y formulario */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h1 className="text-center mb-4">
                Register
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
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
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
                    I accept the terms
                  </label>
                  <div>
                    <a href="#" className="text-dark">
                      Read our T&Cs
                    </a>
                  </div>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
