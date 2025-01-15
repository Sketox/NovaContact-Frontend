import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/router";

export default function ContactsPage() {
  const router = useRouter();

  const contacts = [
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "987-654-3210",
      email: "jane@example.com",
    },
  ];

  // Función para manejar el log out
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated"); // Eliminar indicador de autenticación
      localStorage.removeItem("email"); // Opcional: Eliminar email guardado
      localStorage.removeItem("password"); // Opcional: Eliminar password guardado
      localStorage.removeItem("userId"); // Opcional: Eliminar userId
    }
    router.push("/login"); // Redirigir al usuario a la página de inicio de sesión
  };

  // Función para redirigir a la vista /addcontact
  const handleAddContact = () => {
    router.push("/addcontact");
  };

  return (
    <div>
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
          {/* Botón de Log Out */}
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <h1 className="d-flex justify-content-between align-items-center text-dark mb-5">
          {/* Título e ícono */}
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

          {/* Barra de búsqueda con botón */}
          <div className="input-group w-25">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Search contacts"
              aria-label="Search contacts"
              aria-describedby="button-addon2"
            />
            <button className="btn btn-dark" type="button" id="button-addon2">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </h1>

        {/* Tarjetas de Contactos (horizontal) */}
        <div className="mt-5">
          {contacts.map((contact) => (
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
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddContact} // Llama a la función para redirigir
          className="btn btn-dark btn-lg btn-level-block mt-3"
        >
          Add Contact
        </button>
      </div>
    </div>
  );
}
