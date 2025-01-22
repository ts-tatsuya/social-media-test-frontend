import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

function ResendVerification() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const userGlobal = useSelector((state) => state.user.user);
    const resendVerificationMail = async () => {
        const data = {
            id: userGlobal.id,
            email: userGlobal.email
        }
        try {
            setIsLoading(true);
            let response = await axios.post('http://localhost:8001/users/reset-password-request-resend', data);
            console.log(response);
            setIsLoading(false);
            setIsSent(true);
        } catch (error) {

        }

    }
    return (
        <div>
            {
                isSent ?
                    <div>
                        <p>New verification email has been sent to {userGlobal.email}!!</p>
                    </div>
                    :
                    <div className='mt-20'>
                        <p>You need to verify your account first before using this site!</p>
                        <p>If you lost your verification email, you can make a request to re-send the verification email by pressing the button below!</p>
                        {
                            isLoading ?
                                <button
                                    type="button"
                                    className="mt-10 group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 opacity-50 cursor-not-allowed"
                                    onClick={resendVerificationMail}
                                >
                                    Resend Verification
                                </button>
                                :
                                <button
                                    type="button"
                                    className=" mt-10 group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={resendVerificationMail}
                                >
                                    Resend Verification
                                </button>
                        }

                    </div>
            }

        </div>
    )
}

export default ResendVerification