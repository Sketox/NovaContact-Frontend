import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Verificar si el usuario ya está autenticado al cargar la página
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("isAuthenticated")
    ) {
      router.push("/contacts"); // Redirigir a la página de contactos
    }

    // Cargar email y password del localStorage si existen
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (storedEmail) {
        setEmail(storedEmail);
      }
      if (storedPassword) {
        setPassword(storedPassword);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Realizar solicitud de autenticación
      const response = await axios.post(
        "https://d186-190-155-72-128.ngrok-free.app/user/authenticate",
        {
          email,
          password,
        }
      );

      console.log("Response from API:", response.data); // Muestra la respuesta completa
      const userId = response.data.userId; // Extraer el userId del response

      // Guardar datos en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("userId", userId); // Guardar el userId obtenido del endpoint
      }

      // Redirigir a la página de contactos
      router.push("/contacts");
    } catch (err) {
      console.error("Error during login:", err.response?.data || err.message);
      setError("Invalid email or password");
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

      {/* Título */}
      <div className="container mt-4 text-center">
        <h1 className="text-dark m-5">
          Login
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
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  localStorage.setItem("email", e.target.value); // Guardar en localStorage
                }}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  localStorage.setItem("password", e.target.value); // Guardar en localStorage
                }}
                required
              />
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            <button type="submit" className="btn btn-dark w-100">
              Sign in
            </button>
            <div className="text-start mt-3">
              <a href="/register" className="text-dark">
                Don't have an account? Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
