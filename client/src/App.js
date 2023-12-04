import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { Function } from "./pages/Function";
import { Procedure } from "./pages/Procedure";
import AbsentHours from "./pages/AbsentHours";
import AddBook from "./pages/AddBook";
import { ToastContainer } from 'react-toastify';
import UpdateBook from "./pages/UpdateBook";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}> 
          <Route path="/books" element={<Outlet />} >
            <Route index element={<Books />} />
            <Route path="add" element={<AddBook />} />
            <Route path=":id" element={<UpdateBook />} />
          </Route>
          <Route path="/function" element={<Function />} />
          <Route path="/procedure" element={<Procedure />} />
          <Route path="/function2" element={<AbsentHours />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        closeOnClick
        />
    </div>
  );
}

export default App;
