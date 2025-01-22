import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const userGlobal = useSelector((state) => state.user.user);
    const [isShowPassword, setIsShowPassword] = useState(false);
    useEffect(() => {
        if (userGlobal.id > 0) {
            navigate("/");
        }
    }, [userGlobal]);
    const RegisterSchema = Yup.object().shape({
        username: Yup.string().required("Username cannot be empty"),
        email: Yup.string()
            .required("Email cannot be empty")
            .email("Wrong email format"),
        password: Yup.string()
            .required("Password cannot be empty")
            .min(8, "Password to short")
            .matches('[A-Z]')
            .matches('[a-z]')
            .matches('[0-9]')
            .matches('[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]')
    });

    const registerUser = async (value) => {
        try {
            setIsLoading(true);
            let response = await axios.post("http://localhost:8001/users/", value);
            alert(response.data.message);
            setIsLoading(false);

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    // const usernameUniqueCheck = async (value) => {
    //     try {
    //         let response = await axios.get("http://localhost:8001/users/username/unique-check/" + value);
    //         console.log(response);
    //         alert(response.data.message);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div>
            <Formik
                initialValues={{ username: "", email: "", password: "" }}
                validationSchema={RegisterSchema}
                onSubmit={(value) => {
                    registerUser(value);
                }}
            >
                {(props) => {
                    return (
                        <div>
                            <div>
                                <div>
                                    <h2>
                                        Register your account
                                    </h2>
                                </div>
                                <Form action="#" method="POST">
                                    <input type="hidden" name="remember" defaultValue="true" />
                                    <div>
                                        <div>
                                            <label htmlFor="username" className="sr-only">
                                                Username
                                            </label>
                                            <Field
                                                id="username"
                                                name="username"
                                                type="text"
                                                autoComplete="username"
                                                required
                                                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Username"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="username"
                                                style={{ color: "red", fontSize: "12px" }}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email-address" className="sr-only">
                                                Email address
                                            </label>
                                            <Field
                                                id="email-address"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Email address"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="email"
                                                style={{ color: "red", fontSize: "12px" }}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="sr-only">
                                                Password
                                            </label>
                                            <Field
                                                id="password"
                                                name="password"
                                                type={isShowPassword ? "text" : "password"}
                                                autoComplete="current-password"
                                                required
                                                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        </div>
                                    </div>

                                    <div>
                                        {isLoading ? (
                                            <button
                                                type="submit"
                                                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 opacity-50 cursor-not-allowed"
                                                disabled
                                            >
                                                Register
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Register
                                            </button>
                                        )}
                                    </div>
                                </Form>
                            </div>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
}

export default Register;