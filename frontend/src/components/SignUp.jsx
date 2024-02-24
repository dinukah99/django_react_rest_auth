import {useEffect, useState} from 'react'
import axios from "axios"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: ""
    })
    const [error, setError] = useState('')

    const handleOnchange = (e) => {
        setFormdata({...formdata, [e.target.name]: e.target.value})
    }


    const handleSigninWithGoogle = async (response) => {
        console.log(response)
        const payload = response.credential
        const server_res = await axios.post("http://localhost:8000/api/v1/auth/google/", {'access_token': payload})
        const user = {
            "email": server_res.data.email,
            "names": server_res.data.full_name
        }
        console.log(server_res.data)
        if (server_res.status === 200) {
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('access', JSON.stringify(server_res.data.access_token))
            localStorage.setItem('refresh', JSON.stringify(server_res.data.refresh_token))
            navigate('/profile')
            toast.success("Login Successful..")
        }
    }

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            /* global google */
            if (typeof google !== 'undefined') {
                google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_CLIENT_ID,
                    callback: handleSigninWithGoogle
                });

                google.accounts.id.renderButton(
                    document.getElementById("signInDiv"),
                    {
                        theme: "outline",
                        size: "large",
                        text: "continue_with",
                        shape: "circle",
                        width: "280"
                    }
                );
            } else {
                console.error("Google API is not yet loaded.");
            }
        };
        const timeoutId = setTimeout(initializeGoogleSignIn, 500);
        return () => clearTimeout(timeoutId);
    }, []);


    const {email, first_name, last_name, password, password2} = formdata

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:8000/api/v1/auth/register/', formdata)
        console.log(response.data)
        const result = response.data
        if (response.status === 201) {
            navigate("/otp/verify")
            toast.success(result.message)
        }


    }

    return (
        <div>
            <div className='form-container'>
                <div style={{width: "100%"}} className='wrapper'>
                    <h2>create account</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="">Email Address:</label>
                            <input type="text"
                                   className='email-form'
                                   name="email"
                                   value={email}
                                   onChange={handleOnchange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">First Name:</label>
                            <input type="text"
                                   className='email-form'
                                   name="first_name"
                                   value={first_name}
                                   onChange={handleOnchange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Last Name:</label>
                            <input type="text"
                                   className='email-form'
                                   name="last_name"
                                   value={last_name}
                                   onChange={handleOnchange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Password:</label>
                            <input type="text"
                                   className='email-form'
                                   name="password"
                                   value={password}
                                   onChange={handleOnchange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Confirm Password:</label>
                            <input type="text"
                                   className='p'
                                   name="password2"
                                   value={password2}
                                   onChange={handleOnchange}/>
                        </div>
                        <input type="submit" value="Submit" className="submitButton"/>

                    </form>
                    <h3 className='text-option'>Or</h3>
                    <div className='googleContainer'>
                        <div id="signInDiv" className='gsignIn'></div>
                    </div>
                    <div className='githubContainer'>
                        <button>Sign up with Github</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup