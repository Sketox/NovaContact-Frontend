import "../utils/globals";
import Footer from "../components/footer";
import Header from "../components/header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import "../styles/globals.css";
import { Spinner, Pagination, Row, Col } from "react-bootstrap";

export default function ContactsPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [editing, setEditing] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  useEffect(() => {
    fetchContacts();
  }, [router]);

  const fetchContacts = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }
    try {
      const response = await api.get(`/tutorial/getContact/${userId}`);
      console.log("Contacts API Response:", response.data);

      const formatContact = (contact) => {
        const imageName = contact.image
          ? contact.image.split(/[/\\]/).pop()
          : "";
        const photoUrl = imageName
          ? `/api/getImage/${imageName}`
          : "https://via.placeholder.com/160";
        console.log("Fetching Image from:", photoUrl);
        return { ...contact, image: imageName, photoUrl };
      };

      const formattedContacts = Array.isArray(response.data)
        ? response.data.map(formatContact)
        : [formatContact(response.data)];

      setContacts(formattedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchContacts();
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/tutorial/searchContact/${searchTerm}`);
      console.log("Search API Response:", response.data);

      const formatContact = (contact) => {
        const imageName = contact.image
          ? contact.image.split(/[/\\]/).pop()
          : "";
        const photoUrl = imageName
          ? `/api/getImage/${imageName}`
          : "https://via.placeholder.com/160";
        console.log("Fetching Image from:", photoUrl);
        return { ...contact, image: imageName, photoUrl };
      };

      if (
        !response.data ||
        (Array.isArray(response.data) && response.data.length === 0)
      ) {
        setContacts([]);
      } else if (Array.isArray(response.data)) {
        setContacts(response.data.map(formatContact));
        setError("");
      } else if (
        typeof response.data === "object" &&
        Object.keys(response.data).length > 0
      ) {
        setContacts([formatContact(response.data)]);
        setError("");
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.error("Error searching contacts:", error);
      setContacts([]);
      setError("No existen contactos con ese nombre");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    setLoadingLogout(true);
    localStorage.clear();
    router.push("/login");
  };

  const handleAddContact = () => {
    setLoadingAdd(true);
    router.push("/addcontact");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = Array.isArray(contacts)
    ? contacts.slice(indexOfFirstContact, indexOfLastContact)
    : [];

  return (
    <div>
      <Header />
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/id">
            <span className="ms-4 me-2">NovaContact</span>
            <img
              src="/NovaContactLogo.svg"
              alt="NovaContact Logo"
              width="30"
              height="30"
            />
          </a>
          <form
            className="d-flex my-2 my-lg-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-dark"
              type="button"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </form>
        </div>
      </nav>

      <div className="container mt-5">
        <h1 className="text-dark mb-5">
          Contactos
          <img
            src="/Planet.png"
            alt="NovaContact Logo"
            width="50"
            height="50"
            className="d-inline-block align-text-center m-2"
          />
        </h1>
        {error && (
          <div className="alert alert-warning text-center">{error}</div>
        )}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-50">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <Row>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact) => (
                <Col md={6} key={contact.userId}>
                  <div className="card mb-3">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            contact.image
                              ? contact.image
                              : "https://via.placeholder.com/160"
                          }
                          className="img-fluid rounded-start me-3"
                          alt="Contact"
                          width="160"
                          height="160"
                        />
                        <div>
                          <h5 className="card-title">{contact.name}</h5>
                          <p className="card-text">
                            Teléfono: {contact.number} <br /> Correo:{" "}
                            {contact.email || "N/A"}
                          </p>
                          <button
                            onClick={() =>
                              router.push(`/editcontact/${contact.id}`)
                            }
                            className="btn btn-outline-dark"
                          >
                            Editar
                          </button>
                        </div>
                      </div>
                      {contact.note && (
                        <div
                          className="text-muted"
                          style={{ maxWidth: "200px" }}
                        >
                          <strong>Nota:</strong> {contact.note}
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div className="text-center text-muted">
                No existen contactos con ese nombre
              </div>
            )}
          </Row>
        )}
        <Pagination
          className="justify-content-center mt-4 pagination-dark"
          variant="dark"
        >
          {[...Array(Math.ceil(contacts.length / contactsPerPage))].map(
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-dark btn-lg"
            onClick={() => router.push("/addcontact")}
            disabled={loadingAdd}
          >
            {loadingAdd ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Agregar Contacto"
            )}
          </button>
          <button
            className="btn btn-danger btn-lg"
            onClick={handleLogout}
            disabled={loadingLogout}
          >
            {loadingLogout ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Cerrar Sesión"
            )}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
