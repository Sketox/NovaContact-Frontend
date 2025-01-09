import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ContactsPage() {
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
        </div>
      </nav>

      <div className="container mt-5">
        <h1 className="d-flex justify-content-between align-items-center text-dark mb-5">
          {/* Título e ícono */}
          <div>
            Contacts
            <img
              src="data:image/png;base64,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"
              width="50"
              height="50"
              alt="planet"
              class="m-2"
            ></img>
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
      </div>
    </div>
  );
}
