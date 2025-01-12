import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de registro
    console.log('Formulario enviado');
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
                Registro
                <i className="bi bi-satellite ms-2"></i>
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="number" className="form-label">Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="number"
                    placeholder="Enter your phone number"
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
                    <a href="#" className="text-decoration-none">Read our T&Cs</a>
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