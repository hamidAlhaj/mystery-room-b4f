import { BrowserRouter, Route, Routes  } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MysteriesPage from "../pages/MysteriesPage";
import GamePage from "../pages/GamePage";
import ResultPage from "../pages/ResultPage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";
import MysteryDetailsPage from "../pages/MysteryDetailsPage";

export function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mysteries" element={<MysteriesPage />} />
      <Route path="/mysteries/:id" element={<MysteryDetailsPage />} />
      <Route path="/mysteries/:id/play" element={<GamePage />} />
      <Route path="/result/:id" element={<ResultPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />;
    </Routes>
    </BrowserRouter>
  );
}
