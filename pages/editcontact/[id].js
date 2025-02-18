import "../../utils/globals";
import Header from "../../components/header";
import Footer from "../../components/footer";
import api from "../../utils/api"; // Importar configuración de Axios
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

export default function EditContact() {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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

  const validateName = (name) => /^[A-Za-z]+$/.test(name);
  const validateNumber = (number) => /^[0-9]{10,13}$/.test(number);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones
    if (!validateName(contact.name)) {
      setError("El nombre solo puede contener letras sin espacios.");
      setLoading(false);
      return;
    }

    let imagePath = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image); // Asegúrate de que el campo coincide con 'file' en FileInterceptor

      try {
        const response = await api.post("/upload/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imagePath = response.data.filePath;
      } catch (error) {
        setError("Error al subir la imagen.");
        setLoading(false);
        return;
      }
    }

    if (!validateNumber(contact.number)) {
      setError("El número solo debe contener entre 10 a 13 dígitos.");
      setLoading(false);
      return;
    }

    if (contact.email && !validateEmail(contact.email)) {
      setError("Ingrese un correo electrónico válido.");
      setLoading(false);
      return;
    }

    try {
      await api.put(`/tutorial/editContact/${id}`, contact);
      router.push("/contacts");
    } catch (error) {
      console.error("Error al editar el contacto:", error);
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setError("Solo se permiten imágenes.");
    }
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

  if (!contact) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="vh-100 d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/id">
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
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                  />{" "}
                  Cargando...
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
                <h1 className="text-center mb-4">
                  Editar Contacto
                  <img
                    src="/Moonrover.png"
                    alt="Moonrover Icon"
                    width="50"
                    height="50"
                    className="d-inline-block align-text-center m-2"
                  />
                </h1>
                {/* Área de imagen */}
                <div className="text-center mb-4">
                  <div className="border rounded p-4 d-inline-block">
                    <i className="bi bi-image fs-1"></i>
                    <div className="mb-3 text-center">
                      <label className="form-label">Imagen de Contacto</label>
                      <button
                        type="button"
                        className="btn btn-dark d-block mx-auto"
                        onClick={() =>
                          document.getElementById("imageInput").click()
                        }
                      >
                        {preview ? (
                          <img
                            src={preview}
                            alt="Preview"
                            className="img-thumbnail"
                            width="100"
                          />
                        ) : (
                          "Seleccionar Imagen"
                        )}
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="d-none"
                        id="imageInput"
                      />
                    </div>
                  </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
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
        <Footer />
      </div>
    </>
  );
}
