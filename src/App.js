import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
