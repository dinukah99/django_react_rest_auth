import {useState} from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: '',
    })

    const {email, first_name, last_name, password, password2} = formData;

    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !first_name || !last_name || !password || !password2) {
            setError('All fields are required!');
        } else {
            //make call to api
            const res = await axios.post("http://localhost:8000/api/v1/auth/register/", formData)
            //check our response
            const response = res.data
            if (res.status === 201) {
                //redirect to verify email component
                navigate('/otp/verify')
                toast.success(response.message)
            }

            // server error pass to error
        }
    }

    return (
        <div>
            <div className='form-container'>
                <div style={{width: '100%'}} className='wrapper'>
                    <h2>Create Account</h2>
                    <form onSubmit={handleSubmit}>

                        <div className='form-group'>
                            <label htmlFor=''>Email Address:</label>
                            <input type='text'
                                   className='email form'
                                   name='email'
                                   value={email}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor=''>First Name:</label>
                            <input type='text'
                                   className='email form'
                                   name='first_name'
                                   value={first_name}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor=''>Last Name:</label>
                            <input type='text'
                                   className='email form'
                                   name='last_name'
                                   value={last_name}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor=''>Password:</label>
                            <input type='password'
                                   className='email form'
                                   name='password'
                                   value={password}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor=''>Confirm Password:</label>
                            <input type='password'
                                   className='email form'
                                   name='password2'
                                   value={password2}
                                   onChange={handleChange}
                            />
                        </div>
                        <p style={{color: 'red', padding: '1px'}}>{error ? error : ''} </p>
                        <input onMouseOver={(e) => e.target.style.cursor = 'pointer'} type='submit' value='Submit'
                               className='submitButton'/>
                    </form>
                    <h3 className='text-option'>Or</h3>
                    <div className='googleContainer'>
                        <button>Sign up with Google</button>
                    </div>
                    <div className='githubContainer'>
                        <button>Sign up with GitHub</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;