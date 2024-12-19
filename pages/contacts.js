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
        <h1 className="d-flex justify-content-between align-items-center text-dark mb-4">
          {/* Título e ícono */}
          <div>
            Contacts
            <img
              src="https://img.icons8.com/?size=100&id=11490&format=png&color=000000"
              alt="Planet Icon"
              width="90"
              height="90"
              className="ms-2"
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
      </div>
    </div>
  );
}
