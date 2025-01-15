import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

export default function AddContact() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const name = e.target.name.value;
    const number = e.target.number.value;
    const email = e.target.email.value;
    const notes = e.target.notes.value;

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
      const response = await axios.post(
        "https://aac7-190-15-130-164.ngrok-free.app/tutorial/createData",
        contactData
      );

      console.log("Response from server:", response.data);
      alert("¡Contacto añadido exitosamente!");

      // Redirigir a la página de contactos después de añadir el contacto
      window.location.href = "/contacts";
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Hubo un error al añadir el contacto, por favor intente de nuevo.");
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
                Add Contact
                <img
                  src="/Spacegun.png"
                  alt="Spacegun Icon"
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
                    placeholder="Enter contact name"
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
                    placeholder="Enter phone number"
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
                    placeholder="Enter email"
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
                    placeholder="Additional notes"
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
