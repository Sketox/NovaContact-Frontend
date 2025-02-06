export default function Footer() {
  return (
    <footer
      className="bg-dark text-white text-center py-4"
      style={{ marginTop: "280px" }}
    >
      <div className="container">
        <p>
          &copy; 2025 Agenda Web NovaContact. Todos los derechos reservados.
        </p>
        <p>
          <a href="#" className="text-white me-3">
            Términos de servicio
          </a>
          <a href="#" className="text-white">
            Política de privacidad
          </a>
        </p>
        <p>
          Síguenos en:
          <a href="#" className="text-white me-2">
            Facebook
          </a>
          <a href="#" className="text-white me-2">
            Twitter
          </a>
          <a href="#" className="text-white me-2">
            Instagram
          </a>
          <a href="#" className="text-white">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
