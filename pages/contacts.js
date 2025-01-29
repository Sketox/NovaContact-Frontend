import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Configurar Axios con ngrok y CORS
const instance = axios.create({
  baseURL: "https://7dc3-186-70-178-190.ngrok-free.app",
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default function ContactsPage() {
  const router = useRouter();
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
        const response = await instance.get(`/tutorial/getContact/${userId}`);
        console.log("Response from API:", response);
        console.log("Response Data:", response.data);

        // Convertir el objeto recibido en un arreglo
        const contactArray = Object.values(response.data);

        // Establecer el estado de los contactos
        setContacts(contactArray);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [router]);

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
                        <strong>Phone:</strong> {contact.number} <br />
                        <strong>Email:</strong> {contact.email || "N/A"}
                      </p>
                      <a
                        href={`/editcontact/${contact.id}`} // Enlace para editar el contacto
                        className="btn btn-outline-dark mt-2"
                      >
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
