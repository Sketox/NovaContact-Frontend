import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Configurar Axios con ngrok y CORS
const instance = axios.create({
  baseURL: "https://4b69-2800-bf0-a40c-125a-6458-cf98-a94c-fba.ngrok-free.app",
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default function EditContact() {
  const router = useRouter();
  const { contactId } = router.query; // Obtener el contactId de la URL
  const [contact, setContact] = useState({
    name: "",
    number: "",
    email: "",
    notes: "",
  });

  // Cargar los datos del contacto al cargar la página
  useEffect(() => {
    const fetchContactData = async () => {
      if (contactId) {
        try {
          const userId = localStorage.getItem("userId");

          if (!userId) {
            router.push("/login"); // Redirigir si no hay userId
            return;
          }

          // Reemplazar la URL con la correcta
          const response = await instance.get(`/user/getContact/${userId}`);
          setContact({
            name: response.data.name || "",
            number: response.data.number || "",
            email: response.data.email || "",
            notes: response.data.notes || "",
          });
        } catch (error) {
          console.error("Error fetching contact:", error);
        }
      }
    };

    fetchContactData();
  }, [contactId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        router.push("/login"); // Redirigir si no hay userId
        return;
      }

      // Reemplazar la URL con la correcta para el PUT
      const response = await instance.put(
        `/user/editContact/${contactId}`,
        contact
      );
      console.log("Contacto editado con éxito:", response.data);
      router.push("/contacts"); // Redirigir a la lista de contactos después de editar
    } catch (error) {
      console.error("Error al editar el contacto:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        router.push("/login"); // Redirigir si no hay userId
        return;
      }

      // Reemplazar la URL con la correcta para el DELETE
      const response = await instance.delete(
        `/user/deleteContact/${contactId}`
      );
      console.log("Contacto eliminado con éxito:", response.data);
      router.push("/contacts"); // Redirigir a la lista de contactos después de eliminar
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
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
                    name="number"
                    value={contact.number}
                    onChange={handleChange}
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
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    rows="3"
                    value={contact.notes}
                    onChange={handleChange}
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
