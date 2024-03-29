import "./App.css"
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { Function } from "./pages/Function";
import AddBook from "./pages/AddBook";
import { ToastContainer } from 'react-toastify';
import UpdateBook from "./pages/UpdateBook";
import { MostSold } from "./pages/MostSold";
import { BillPrices } from "./pages/BillPrices";
import { AbsentHours } from "./pages/AbsentHours";
import { ShiftEmployees } from "./pages/ShiftEmployees";

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
          <Route path="/mostsold" element={<MostSold />} />
          <Route path="/billprices" element={<BillPrices />} />
          <Route path="/function2" element={<AbsentHours />} />          
          <Route path="/shiftemployees" element={<ShiftEmployees />} />
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
