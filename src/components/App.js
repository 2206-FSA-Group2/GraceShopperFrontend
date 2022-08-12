import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import RegisterUser from "./Register/RegisterUser";

const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<RegisterUser/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
        </BrowserRouter>
        
        
    )
}

export default App;