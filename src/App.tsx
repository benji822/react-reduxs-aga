import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import AddEditUser from "./pages/AddEditUser";
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import React from "react";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/addUser' element={<AddEditUser />} />
          <Route path='/editUser/:id' element={<AddEditUser />} />
          <Route path='/userInfo/:id' element={<UserInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
