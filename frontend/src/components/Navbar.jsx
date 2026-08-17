function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-inner">

        <div className="logo">
          <div className="logo-mark">
            N
          </div>

          <div>
            <strong>NeuroAI</strong>
            <span>Health Intelligence</span>
          </div>
        </div>

        <div className="nav-right">

          <div className="model-pill">
            <span className="online-dot"></span>
            API Online
          </div>

          <div className="model-version">
            RF Model · v1.0
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;