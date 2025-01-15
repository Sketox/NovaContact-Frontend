import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Contact() {
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
          <a href="/contacts" className="btn btn-dark me-4">
            Contacts
          </a>
        </div>
      </nav>

      {/* Título y detalles del contacto */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h1 className="text-center mb-4">
                Contact
                <img
                  src="/Spacefighter.png"
                  alt="Spacefighter Icon"
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

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control bg-light"
                  value="Filled Value"
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Number</label>
                <input
                  type="tel"
                  className="form-control bg-light"
                  value="Filled Value"
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control bg-light"
                  value="Filled Value"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control bg-light"
                  rows="3"
                  value="Filled Value"
                  readOnly
                ></textarea>
              </div>

              <a href="/editcontact" className="btn btn-dark w-100">
                Edit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
