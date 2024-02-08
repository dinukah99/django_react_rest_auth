import {useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = loginData;
        if (!email || !password) {
            setError('Email and password are required');
        } else {
            setIsLoading(true);
            const res = await axios.post("http://localhost:8000/api/v1/auth/login/", loginData)
            const response = res.data;
            console.log(response);
            setIsLoading(false)
            const user = {
                "email": response.email,
                "names": response.names
            }
            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('access', JSON.stringify(response.access_token))
                localStorage.setItem('refresh', JSON.stringify(response.refresh_token))
                navigate('/profile')
                toast.success("Login Successful..")
            }
        }
    }

    return (
        <div>
            <div className='form-container'>
                <div style={{width: '100%'}} className='wrapper'>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        {isLoading && (
                            <p>Loading....</p>
                        )}
                        <div className='form-group'>
                            <label htmlFor=''>Email Address:</label>
                            <input type='text'
                                   className='email form'
                                   name='email'
                                   value={loginData.email}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor=''>Password:</label>
                            <input type='password'
                                   className='email form'
                                   name='password'
                                   value={loginData.password}
                                   onChange={handleChange}
                            />
                        </div>
                        <input onMouseOver={(e) => e.target.style.cursor = 'pointer'} type='submit' value='Submit'
                               className='submitButton'/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
