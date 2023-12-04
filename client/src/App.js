import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Books } from "./pages/Books";
import { Function } from "./pages/Function";
import { MostSold } from "./pages/MostSold";
import { Procedure } from "./pages/Procedure";
import { AbsentHours } from "./pages/AbsentHours";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}> 
          <Route path="/books" element={<Books />} />
          <Route path="/function" element={<Function />} />
          <Route path="/mostsold" element={<MostSold />} />
          <Route path="/procedure" element={<Procedure />} />
          <Route path="/function2" element={<AbsentHours />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
