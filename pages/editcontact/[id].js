import "../../utils/globals";
import api from "../../utils/api"; // Importar configuración de Axios
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

export default function EditContact() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState("");
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingContact, setLoadingContact] = useState(false); // Estado de carga para cargar la pagina de contactos
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchContactData = async () => {
      if (!id) return;
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          router.push("/login");
          return;
        }
        const response = await api.get(`/tutorial/getContactById/${id}`);
        if (!response.data.message) {
          setContact(response.data);
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContactData();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/tutorial/editContact/${id}`, contact);
      router.push("/contacts");
    } catch (error) {
      console.error("Error al editar el contacto:", error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/tutorial/deleteContact/${id}`);
      router.push("/contacts");
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
    setDeleting(false);
  };

  const handleLoadingContacts = () => {
    setLoadingContact(true); // Activar el indicador de carga
    setError(""); // Limpiar errores anteriores
    router.push("/contacts");
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="vh-100 d-flex flex-column">
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
          <button
            onClick={handleLoadingContacts}
            className="btn btn-dark me-4"
            disabled={loadingContact}
          >
            {loadingContact ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" />{" "}
                Cargand...
              </>
            ) : (
              "Contactos"
            )}
          </button>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h1 className="text-center mb-4">Editar Contacto</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    required
                    value={contact.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    Número
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="number"
                    name="number"
                    required
                    value={contact.number}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
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
                    Notas adicionales
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    rows="3"
                    name="notes"
                    value={contact.notes || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-dark w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
              </form>
              <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Eliminar Contacto"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
