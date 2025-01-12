import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AddContact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contacto añadido');
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
          <a href="/contacts" className="btn btn-dark me-4">
            Contacts
          </a>
        </div>
      </nav>

      {/* Título y formulario */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h1 className="text-center mb-4">
                Add Contact
                <i className="bi bi-person-plus ms-2"></i>
              </h1>

              <form onSubmit={handleSubmit}>
                {/* Área de imagen */}
                <div className="text-center mb-4">
                  <div className="border rounded p-4 d-inline-block">
                    <i className="bi bi-image fs-1"></i>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Value"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="number" className="form-label">Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="number"
                    placeholder="Value"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email (Opcional)</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Value"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    id="notes"
                    rows="3"
                    placeholder="Value"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Add Contact
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}