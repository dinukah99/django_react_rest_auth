import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axiosInstance from "../utils/axiosInstance.js";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const jwt_access = localStorage.getItem('access')

    useEffect(() => {
        if (jwt_access === null && !user) {
            navigate('/login')
        } else {
            getSomeData()
        }
    }, [jwt_access, user])

    const refresh = JSON.parse(localStorage.getItem('refresh'))

    const getSomeData = async () => {
        const res = await axiosInstance.get('/auth/profile/')
        if (res.status === 200) {
            console.log(res.data)
        }
    }

    const handleLogout = async () => {
        const res = await axiosInstance.post('/auth/logout/', {'refresh_token': refresh})
        if (res.status === 204) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('user')
            navigate('/login')
            toast.success('Successfully Logged Out')
        }
    }

    return (
        <div className='container'>
            <h2>Hi {user && user.names}</h2>
            <p style={{textAlign: 'center'}}>Welcome to your Profile</p>
            <button onClick={handleLogout} className='logout-btn'>Logout</button>
        </div>
    );
}

export default Profile;