import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const userId = localStorage.getItem("userId");
      console.log("User ID:", userId); // Verificar que se obtiene el userId

      try {
        const response = await axios.get(
          `https://819f-2800-bf0-a40c-125a-2527-aa7-b3d3-7ba0.ngrok-free.app/getcontact/${userId}`
        );

        console.log("Response from API:", response); // Verifica la respuesta completa de la API
        console.log("Response Data:", response.data); // Verifica los datos específicos

        // Verificar si la respuesta es un array y establecer el estado
        if (Array.isArray(response.data)) {
          setContacts(response.data);
        } else {
          console.error("La respuesta no es un array", response.data);
          setContacts([]); // Establecer como un array vacío si no es válido
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("userId");
    }
    router.push("/login");
  };

  const handleAddContact = () => {
    router.push("/addcontact");
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
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <h1 className="d-flex justify-content-between align-items-center text-dark mb-5">
          <div>
            Contacts
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
              <div className="card mb-3" key={contact.id}>
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
                        <strong>Phone:</strong> {contact.phone} <br />
                        <strong>Email:</strong> {contact.email}
                      </p>
                      <a href="#" className="btn btn-outline-dark mt-2">
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No contacts found</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddContact}
          className="btn btn-dark btn-lg btn-level-block mt-3"
        >
          Add Contact
        </button>
      </div>
    </div>
  );
}
