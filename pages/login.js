import "../utils/globals";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../utils/api"; // Importar configuración de Axios
import { Spinner } from "react-bootstrap"; // Importar Spinner de Bootstrap

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("isAuthenticated")
    ) {
      router.push("/contacts");
    }

    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (storedEmail) setEmail(storedEmail);
      if (storedPassword) setPassword(storedPassword);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar el indicador de carga
    setError(""); // Limpiar errores anteriores

    try {
      const response = await api.post("/user/authenticate", {
        email,
        password,
      });
      const userId = response.data.userId;

      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("userId", userId);
      }

      router.push("/contacts");
    } catch (err) {
      console.error("Error during login:", err.response?.data || err.message);
      setError("Invalid email or password");
    } finally {
      setLoading(false); // Desactivar el indicador de carga
    }
  };

  return (
    <>
      <Header />
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

        {/* Título */}
        <div className="container mt-4 text-center">
          <h1 className="text-dark m-5">
            Iniciar sesión
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/space-shuttle.png"
              alt="space-shuttle"
              className="m-2"
            />
          </h1>
        </div>

        {/* Login Form */}
        <div className="container d-flex justify-content-center align-items-center">
          <div className="card p-4 shadow" style={{ width: "22rem" }}>
            <form id="login-form" onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    localStorage.setItem("email", e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    localStorage.setItem("password", e.target.value);
                  }}
                  required
                />
              </div>
              {error && <p className="text-danger text-center">{error}</p>}

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
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </button>

              <div className="text-start mt-3">
                <a href="/register" className="text-dark">
                  ¿Eres nuevo? Crea una cuenta
                </a>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
