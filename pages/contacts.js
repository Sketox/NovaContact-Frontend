import "../utils/globals";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../utils/api"; // Importar configuración de Axios
import { Spinner } from "react-bootstrap"; // Importar Spinner de Bootstrap

export default function ContactsPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loadingLogout, setLoadingLogout] = useState(false); // Estado de carga para logout
  const [loadingAdd, setLoadingAdd] = useState(false); // Estado de carga para agregar contacto
  const [editing, setEditing] = useState({}); // Estado de carga por contacto
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const userId = localStorage.getItem("userId");
      console.log("User ID:", userId); // Verificar que se obtiene el userId

      if (!userId) {
        router.push("/login"); // Si no hay userId, redirigir al login
        return;
      }

      try {
        const response = await api.get(`/tutorial/getContact/${userId}`);
        console.log("Response from API:", response);
        console.log("Response Data:", response.data);

        // Validar que la respuesta sea un array antes de procesarla
        if (!response.data || typeof response.data !== "object") {
          setContacts([]);
          return;
        }

        // Convertir el objeto en un array y filtrar contactos vacíos
        const contactArray = Object.values(response.data).filter(
          (contact) => contact && contact.name
        );

        // Establecer el estado con contactos válidos
        setContacts(contactArray);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]); // En caso de error, asegurar que la lista esté vacía
      }
    };

    fetchContacts();
  }, [router]);

  const handleLogout = async () => {
    setLoadingLogout(true); // Activar el indicador de carga
    setError(""); // Limpiar errores anteriores

    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("userId");
    }

    router.push("/login");
  };

  const handleAddContact = () => {
    setLoadingAdd(true); // Activar el indicador de carga
    setError(""); // Limpiar errores anteriores
    router.push("/addcontact");
  };

  const handleEditClick = (contactId) => {
    setEditing((prev) => ({ ...prev, [contactId]: true }));
    router.push(`/editcontact/${contactId}`);
  };

  return (
    <div>
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
            className="btn btn-outline-danger"
            onClick={handleLogout}
            disabled={loadingLogout}
          >
            {loadingLogout ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" />{" "}
                Cerrando Sesión...
              </>
            ) : (
              "Cerrar Sesión"
            )}
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <h1 className="d-flex justify-content-between align-items-center text-dark mb-5">
          <div>
            Contactos
            <img
              src="/Planet.png"
              alt="Planet Icon"
              width="50"
              height="50"
              className="d-inline-block align-text-center m-2"
            />
          </div>
        </h1>

        <div className="mt-5">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div className="card mb-3" key={contact.userId}>
                <div className="row g-0 d-flex align-items-center">
                  <div className="col-md-3 p-0">
                    <img
                      src="https://via.placeholder.com/160"
                      className="img-fluid rounded-start"
                      alt="Contact"
                    />
                  </div>
                  <div className="col-md-9 p-0">
                    <div className="card-body p-2">
                      <h5 className="card-title m-0">{contact.name}</h5>
                      <p className="card-text m-0">
                        <strong>Teléfono:</strong> {contact.number} <br />
                        <strong>Correo:</strong> {contact.email || "N/A"}
                      </p>
                      <button
                        onClick={() => handleEditClick(contact.id)}
                        className="btn btn-outline-dark mt-2"
                        disabled={editing[contact.id]}
                      >
                        {editing[contact.id] ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                          />
                        ) : (
                          "Editar"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron contactos</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddContact}
          className="btn btn-dark btn-lg btn-level-block mt-3"
          disabled={loadingAdd}
        >
          {loadingAdd ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" />{" "}
              Cargando...
            </>
          ) : (
            "Agregar Contacto"
          )}
        </button>
      </div>
    </div>
  );
}
