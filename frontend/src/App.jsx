import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "./components/SignUp.jsx";
import VerifyEmail from "./components/VerifyEmail.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import ForgetPassword from "./components/ForgetPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import './App.css'

function App() {
    return (
        <>
            <Router>
                <ToastContainer/>
                <Routes>
                    <Route path="/" element={<SignUp/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/otp/verify" element={<VerifyEmail/>}/>
                    <Route path="/forget_password" element={<ForgetPassword/>}/>
                    <Route path="/password-reset-confirm/:uid/:token" element={<ResetPassword/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
