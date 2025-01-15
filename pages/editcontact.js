import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

export default function EditContact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contacto editado");
  };

  const handleDelete = async () => {
    // Aquí puedes poner la lógica para eliminar el contacto, por ejemplo, enviando una solicitud al backend
    console.log("Contacto eliminado");

    try {
      const response = await axios.delete(
        "https://aac7-190-15-130-164.ngrok-free.app/contacts/1"
      ); // Usa el id correcto aquí
      console.log("Contacto eliminado con éxito:", response.data);
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
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
                Edit Contact
                <img
                  src="/Moonrover.png"
                  alt="Moonrover Icon"
                  width="50"
                  height="50"
                  className="d-inline-block align-text-center m-2"
                />
              </h1>

              <form onSubmit={handleSubmit}>
                {/* Área de imagen */}
                <div className="text-center mb-4">
                  <div className="border rounded p-4 d-inline-block">
                    <i className="bi bi-image fs-1"></i>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Value"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="number"
                    placeholder="Value"
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
                    placeholder="Value"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    rows="3"
                    placeholder="Value"
                  ></textarea>
                </div>

                <div className="mb-4">
                  {/* Botón de eliminar */}
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn btn-dark me-2"
                      onClick={handleDelete} // Aquí se llama a la función handleDelete
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Save Contact
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast de confirmación */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body bg-dark text-white rounded d-flex justify-content-between align-items-center">
            <span>Contacto eliminado</span>
            <button type="button" className="btn btn-dark btn-sm ms-2">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
