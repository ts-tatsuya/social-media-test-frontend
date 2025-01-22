import React, { useState } from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';

function ResetPasswordRequest() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ResetPasswordRequestSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email cannot be empty")
            .email("Wrong email format")
    });
    const sendRequest = async (value) => {
        try {
            setIsLoading(true);
            let response = await axios.post('http://localhost:8001/users/reset-password-request', value);
            setIsLoading(false);
            setIsSubmitted(true);
        } catch (error) {

        }
    }
    return (
        <div>
            {
                isSubmitted ?
                    <div>RESET PASSWORD REQUEST IS SENT</div>
                    :
                    <div>
                        <h2>Reset Password Request Form</h2>
                        <Formik
                            initialValues={{
                                email: ''
                            }}
                            validationSchema={ResetPasswordRequestSchema}
                            onSubmit={sendRequest}
                        >
                            <Form className='mt-20'>
                                <Field
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Email"
                                />
                                <ErrorMessage
                                    component="div"
                                    name="email"
                                    style={{ color: "red", fontSize: "12px" }}
                                />
                                {
                                    isLoading ?
                                        <button
                                            type="submit"
                                            className="mt-5 group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 opacity-50 cursor-not-allowed"
                                        >
                                            Send Reset Password Request
                                        </button>
                                        :
                                        <button
                                            type="submit"
                                            className="mt-5 group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Send Reset Password Request
                                        </button>
                                }
                            </Form>
                        </Formik>
                    </div>
            }
        </div>
    )
}

export default ResetPasswordRequest