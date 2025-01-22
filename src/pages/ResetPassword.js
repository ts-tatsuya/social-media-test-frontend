import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";
import { useDispatch } from 'react-redux';
import axios from 'axios';

function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    //const [newPassword, setNewPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [isDisplayError, setIsDisplayError] = useState(false);

    const ResetPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password cannot be empty")
            .min(8, "Password to short")
            .matches('[A-Z]')
            .matches('[a-z]')
            .matches('[0-9]')
            .matches('[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]'),
        confirmPassword: Yup.string()
            .required('You need to confirm your password')
            .oneOf([Yup.ref('password'), null], 'Password must be a match')
    });

    useEffect(() => {
        verifyToken();
    }, [])
    const verifyToken = async () => {
        try {
            if (token) {
                const response = await axios.post(
                    "http://localhost:8001/users/reset-password-request/verification",
                    {
                    },
                    {
                        headers: {
                            authorization: `${token}`,
                        },
                    }
                );
                if (response.data.success) {
                    setIsValid(true);
                }
            }
        } catch (error) {
            setIsDisplayError(true);
        }
    }
    const resetPassword = async (value) => {
        try {
            console.log(token);
            if (token) {
                setIsLoading(true);
                console.log("i'm here")
                const response = await axios.patch(
                    "http://localhost:8001/users/reset-password",
                    {
                        password: value.password
                    },
                    {
                        headers: {
                            authorization: `${token}`,
                        },
                    }
                );
                console.log(response.data)
                if (response.data.success) {
                    alert(response.data.message);
                    navigate("/login");
                }
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            {
                isValid ?
                    <div>
                        <Formik
                            initialValues={{
                                password: ''
                            }}
                            validationSchema={ResetPasswordSchema}
                            onSubmit={resetPassword}
                        >
                            <Form className='mt-20'>
                                <Field
                                    id="password"
                                    name="password"
                                    type={isShowPassword ? "text" : "password"}
                                    autoComplete="password"
                                    required
                                    className="relative block w-11/12 rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Password"
                                />
                                <ErrorMessage
                                    component="div"
                                    name="password"
                                    style={{ color: "red", fontSize: "12px" }}
                                />
                                {
                                    isShowPassword ?
                                        <button
                                            type="button"
                                            onClick={() => setIsShowPassword(false)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                        >
                                            Hide
                                        </button>
                                        :
                                        <button
                                            type="button"
                                            onClick={() => setIsShowPassword(true)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                        >
                                            Show
                                        </button>
                                }
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={isShowConfirmPassword ? "text" : "password"}
                                    autoComplete="confirmPassword"
                                    required
                                    className="relative block w-11/12 rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Confirm Password"
                                />
                                <ErrorMessage
                                    component="div"
                                    name="confirmPassword"
                                    style={{ color: "red", fontSize: "12px" }}
                                />
                                {
                                    isShowConfirmPassword ?
                                        <button
                                            type="button"
                                            onClick={() => setIsShowConfirmPassword(false)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                        >
                                            Hide
                                        </button>
                                        :
                                        <button
                                            type="button"
                                            onClick={() => setIsShowConfirmPassword(true)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                        >
                                            Show
                                        </button>
                                }

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
                    :
                    <div>
                        {
                            isDisplayError ?
                                <div>TOKEN INVALID</div>
                                :
                                <div></div>
                        }

                    </div>
            }
        </div>
    )
}

export default ResetPassword