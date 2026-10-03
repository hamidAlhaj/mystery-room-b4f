import { NavLink } from "react-router-dom";

function Navbar() {
  function navLinkClassName({ isActive }: { isActive: boolean }) {
    return isActive ? "nav-link nav-link-active" : "nav-link";
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        Mystery Room
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" className={navLinkClassName}>
          Home
        </NavLink>

        <NavLink to="/mysteries" className={navLinkClassName}>
          Mysteries
        </NavLink>

        <NavLink to="/about" className={navLinkClassName}>
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;