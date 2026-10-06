import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-mark" aria-hidden="true">
          M<span>R</span>
        </span>
        <span>
          Mystery Room<small>THE CASE ARCHIVE</small>
        </span>
      </Link>

      <nav aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/mysteries">The mysteries</NavLink>

        <details className="play-guide">
          <summary>How to play</summary>
          <div className="play-guide-panel">
            <p className="eyebrow">A field guide</p>
            <h2>Follow your curiosity.</h2>
            <ol>
              <li>Open a case and read its story.</li>
              {/* <li>Inspect the clues and choose your answer.</li> */}
              <li>Use a hint when you need a new perspective.</li>
              <li>Solve every stage to close the case.</li>
            </ol>
            <p>Wrong answers are part of the investigation. Take your time.</p>
          </div>
        </details>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <>
              <Sun size={16} /> Light
            </>
          ) : (
            <>
              <Moon size={16} /> Dark
            </>
          )}
        </button>
      </nav>
    </header>
  );
}
