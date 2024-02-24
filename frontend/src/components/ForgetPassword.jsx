import {useState} from 'react'
import axiosInstance from "../utils/axiosInstance.js";
import {toast} from "react-toastify";

const ForgetPassword = () => {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email) {
            const res = await axiosInstance.post('/auth/password-reset/', {"email": email})
            if (res.status === 200) {
                toast.success("A link to reset your password has been sent to your email")
            }
            setEmail("")
        }
    }

    return (
        <div>
            <h2>Enter your registered email</h2>
            <div className='wrapper'>
                <form action="" onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="">Email Address:</label>
                        <input type="text"
                               className='email-form'
                               name="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className='vbtn'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword