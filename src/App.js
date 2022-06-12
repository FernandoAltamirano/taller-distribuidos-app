import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { Home, Hostels, Pets } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hostels" element={<Hostels />} />
          <Route path="/pets" element={<Pets />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
