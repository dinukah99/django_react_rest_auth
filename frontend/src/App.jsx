import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import SignUp from "./components/SignUp.jsx";
import VerifyEmail from "./components/VerifyEmail.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import ForgetPassword from "./components/ForgetPassword.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SignUp/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Profile/>}/>
                    <Route path="/otp/verify" element={<VerifyEmail/>}/>
                    <Route path="/forget_password" element={<ForgetPassword/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
