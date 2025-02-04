import "../../utils/globals";
import api from "../../utils/api"; // Importar configuración de Axios
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditContact() {
  const router = useRouter();
  const { id } = router.query; // Obtener el ID del contacto desde la URL
  const [contact, setContact] = useState(null);

  // Cargar los datos del contacto
  useEffect(() => {
    const fetchContactData = async () => {
      if (!id) return;

      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          router.push("/login");
          return;
        }

        // Llamar al endpoint para obtener el contacto por ID
        const response = await api.get(`/tutorial/getContactById/${id}`);
        if (response.data.message) {
          console.error(response.data.message);
        } else {
          setContact(response.data); // Establecer los datos del contacto
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchContactData();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamar al endpoint para editar el contacto
      await api.put(`/tutorial/editContact/${id}`, contact);
      router.push("/contacts"); // Redirigir después de editar
    } catch (error) {
      console.error("Error al editar el contacto:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value, // Actualizar el estado del contacto con los nuevos valores
    }));
  };

  // Función para manejar la eliminación del contacto
  const handleDelete = async () => {
    try {
      await api.delete(`/tutorial/deleteContact/${id}`);
      router.push("/contacts"); // Redirigir a la lista de contactos después de la eliminación
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
  };

  if (!contact) return <p>Loading...</p>;

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
                    placeholder="Enter contact name"
                    required
                    value={contact.name}
                    onChange={handleChange}
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
                    placeholder="Enter phone number"
                    required
                    value={contact.number}
                    onChange={handleChange}
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
                    placeholder="Enter email"
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
                    rows="3"
                    placeholder="Additional notes"
                    value={contact.notes || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Save Contact
                </button>
              </form>

              {/* Botón para eliminar el contacto */}
              <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleDelete}
              >
                Delete Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
