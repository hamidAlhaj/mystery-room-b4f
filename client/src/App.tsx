import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MysteriesPage from "./pages/MysteriesPage";
import MysteryDetailsPage from "./pages/MysteryDetailsPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mysteries" element={<MysteriesPage />} />
          <Route path="/mysteries/:id" element={<MysteryDetailsPage />} />
          <Route path="/mysteries/:id/play" element={<GamePage />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
