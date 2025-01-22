import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userGlobal = useSelector((state) => state.user.user);

    return (
        <div className="bg-black flex flex-row justify-between items-center px-10 h-20">
            <div className="text-white">
                <p className="font-semibold text-lg">Insta de wa nai yo!!</p>
            </div>
            <div className="text-white flex flex-row items-center gap-10">
                <p
                    className="hover:cursor-pointer"
                    onClick={() => navigate('/')}
                >Home</p>
                <p
                    className="hover:cursor-pointer"
                    onClick={() => navigate('/posting')}
                >Posting</p>
                {userGlobal.id > 0 ? (
                    <>
                        {userGlobal.profile_picture_url ? (
                            <img
                                src={`http://localhost:8001/${userGlobal.profile_picture_url}`}
                                alt=""
                                className="w-10 h-10 rounded-full"
                            />
                        ) : (
                            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            </div>
                        )}
                        {
                            userGlobal.username != undefined && userGlobal.username != '' ?
                                <div>
                                    <a href="/profile">{userGlobal.username}</a>
                                </div>
                                :
                                ''
                        }
                        <div>
                            <p
                                onClick={() => {
                                    dispatch(logoutUser());
                                    navigate('/login')
                                }}
                                className="hover:cursor-pointer"
                            >
                                Logout
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <p
                            className="hover:cursor-pointer"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </p>
                        <p
                            className="hover:cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
