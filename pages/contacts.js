import "../utils/globals";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import { Spinner } from "react-bootstrap";

export default function ContactsPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [editing, setEditing] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    const fetchContacts = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        router.push("/login");
        return;
      }
      try {
        const response = await api.get(`/tutorial/getContact/${userId}`);
        const contactArray = Object.values(response.data || {}).filter(
          (contact) => contact && contact.name
        );
        setContacts(contactArray);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [router]);

  const handleLogout = async () => {
    setLoadingLogout(true);
    setError("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("userId");
    }
    router.push("/login");
  };

  const handleAddContact = () => {
    setLoadingAdd(true);
    setError("");
    router.push("/addcontact");
  };

  const handleEditClick = (contactId) => {
    setEditing((prev) => ({ ...prev, [contactId]: true }));
    router.push(`/editcontact/${contactId}`);
  };

  // Filtrar contactos en base a la búsqueda
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <form
            className="d-flex my-2 my-lg-0"
            onSubmit={(e) => e.preventDefault()} // Evita que la página se recargue
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar por nombre"
              aria-label="Search"
              style={{ color: "black", borderColor: "black" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
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
          <button
            className="btn btn-danger"
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
        </h1>
        <div className="mt-5">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center vh-50">
              <Spinner animation="border" variant="dark" />
            </div>
          ) : filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
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
                          <Spinner animation="border" size="sm" />
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
            <div className="text-center text-muted">
              No se encontraron contactos con ese nombre
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddContact}
          className="btn btn-dark btn-lg btn-level-block mt-3"
          disabled={loadingAdd}
        >
          {loadingAdd ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Agregar Contacto"
          )}
        </button>
      </div>
      <Footer />
    </div>
  );
}
