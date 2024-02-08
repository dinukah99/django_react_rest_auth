import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Profile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const jwt_access = localStorage.getItem('access')

    useEffect(() => {
        if (jwt_access === null && !user) {
            navigate('/login')
        }
    }, [])

    return (
        <div className='container'>
            <h2>Hi {user && user.names}</h2>
            <p style={{textAlign: 'center'}}>Welcome to your Profile</p>
            <button className='logout-btn'>Logout</button>
        </div>
    );
}

export default Profile;