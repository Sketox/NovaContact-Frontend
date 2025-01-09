import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simulando inicio de sesión con email y contraseña
      if (email === "user@example.com" && password === "password123") {
        router.push("/dashboard"); // Redirigir al usuario
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Simulando inicio de sesión con Google
      console.log("Simulating Google login");
      router.push("/dashboard");
    } catch (err) {
      setError("Error with Google login");
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
        <h1 className="text-dark mb-4">
          Login
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios-filled/50/space-shuttle.png"
            alt="space-shuttle"
            class="m-2"
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            <button type="submit" className="btn btn-dark w-100">
              Sign in
            </button>
            <div className="text-center mt-3">
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
