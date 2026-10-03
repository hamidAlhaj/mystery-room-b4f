import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import MysteriesPage from "./pages/MysteriesPage";
import MysteryDetailsPage from "./pages/MysteryDetailsPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="brand" to="/mysteries">
          <span className="brand-mark" aria-hidden="true">
            M<span>R</span>
          </span>
          <span>
            Mystery Room<small>THE CASE ARCHIVE</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <NavLink to="/mysteries">The mysteries</NavLink>
          <details className="play-guide">
            <summary>How to play</summary>
            <div className="play-guide-panel">
              <p className="eyebrow">A field guide</p>
              <h2>Follow your curiosity.</h2>
              <ol>
                <li>Open a case and read its story.</li>
                <li>Inspect the clues and choose your answer.</li>
                <li>Use a hint when you need a new perspective.</li>
                <li>Solve every stage to close the case.</li>
              </ol>
              <p>
                Wrong answers are part of the investigation. Take your time.
              </p>
            </div>
          </details>
        </nav>
      </header>
      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<MysteriesPage />} />
          <Route path="/mysteries" element={<MysteriesPage />} />
          <Route path="/mysteries/:id" element={<MysteryDetailsPage />} />
          <Route path="/mysteries/:id/play" element={<GamePage />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route
            path="*"
            element={
              <main>
                <h1>Page not found</h1>
                <Link to="/mysteries">Back to mysteries</Link>
              </main>
            }
          />
        </Routes>
      </div>
      <footer className="site-footer">
        <span>
          MYSTERY ROOM <span aria-hidden="true">/</span> TEAM 04
        </span>
        <span>Look closer. There is always a clue.</span>
      </footer>
    </BrowserRouter>
  );
}

// function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Header />

//       <main>
//         <Routes>
//           <Route path="/" element={<HomePage />} />

//           {/* <Route path="/mysteries" element={<MysteriesPage />} />

//           <Route
//             path="/mysteries/:id"
//             element={<MysteryDetailsPage />}
//           /> */}

//           {/* <Route
//             path="/mysteries/:id/play"
//             element={<GamePage />}
//           />

//           <Route path="/result/:id" element={<ResultPage />} /> */}

//           <Route path="/about" element={<AboutPage />} />

//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </main>

//       <Footer />
//     </BrowserRouter>
//   );
// }

export default App;
