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
  const [contacts, setContacts] = useState([]); // Asegurar que contacts es un array
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
      console.log("Datos recibidos:", response.data); // Debug para ver qué se recibe
      setContacts(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const response = await api.get(`/tutorial/searchContact/${searchTerm}`);
      setContacts(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (error) {
      console.error("Error searching contacts:", error);
      setContacts([]);
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
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
        <h1 className="text-dark mb-5">Contactos</h1>
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
                            contact.photoUrl
                              ? contact.photoUrl
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
                No se encontraron contactos
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

        <button
          className="btn btn-dark btn-lg mt-3"
          onClick={handleAddContact}
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
