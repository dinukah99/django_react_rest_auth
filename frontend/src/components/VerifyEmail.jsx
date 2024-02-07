import {useState} from 'react';

const VerifyEmail = () => {
    return (
        <div>
            <div className='form-container'>
                <form action=''>
                    <div className='form-group'>
                        <label htmlFor=''>Enter Your OTP Code:</label>
                        <input type='text'
                               className='email form'
                               name='otp'/>
                    </div>
                    <input type='submit' className='vbtn' value='send'/>
                </form>
            </div>
        </div>
    );
}

export default VerifyEmail;
