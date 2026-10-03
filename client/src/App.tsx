import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
// import MysteriesPage from "../pages/MysteriesPage";
// import MysteryDetailsPage from "../pages/MysteryDetailsPage";
// import GamePage from "../pages/GamePage";
// import ResultPage from "../pages/ResultPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* <Route path="/mysteries" element={<MysteriesPage />} />

          <Route
            path="/mysteries/:id"
            element={<MysteryDetailsPage />}
          /> */}

          {/* <Route
            path="/mysteries/:id/play"
            element={<GamePage />}
          />

          <Route path="/result/:id" element={<ResultPage />} /> */}

          <Route path="/about" element={<AboutPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;