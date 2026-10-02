import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MysteriesPage from "./pages/MysteriesPage";
import MysteryDetailsPage from "./pages/MysteryDetailsPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
