import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Books } from "./pages/Books";
import { Function } from "./pages/Function";
import { Procedure } from "./pages/Procedure";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/function" element={<Function />} />
        <Route path="/procedure" element={<Procedure />} />
      </Routes>
    </div>
  );
}

export default App;
