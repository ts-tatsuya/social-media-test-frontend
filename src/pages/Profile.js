import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Profile() {
    const navigate = useNavigate();
    const userGlobal = useSelector((state) => state.user.user);
    console.log(userGlobal);
    return (
        <div>
            <p className='text-3xl py-10'> Profile</p>
            <div>
                {userGlobal.profile_picture_url ? (
                    <img
                        src={`http://localhost:8001/${userGlobal.profile_picture_url}`}
                        alt=""
                        className="w-400 h-400 rounded-full"
                    />
                ) : (
                    <img id="imagepreview" width="400px" height="400px" style={{ backgroundColor: 'grey', borderRadius: '50%' }} />
                )}
            </div>
            <div>
                <p>Full Name: {userGlobal.fullname}</p>
                <p>Email: {userGlobal.email}</p>
                <p>Username: {userGlobal.username}</p>
                <p>Bio: {userGlobal.bio}</p>
            </div>
            <button
                className="ml-1 mt-3 bg-purple-500 hover:bg-purple-700 text-white font-bold  px-3 border border-blue-700 rounded"
                onClick={() => navigate('/profile/edit')}
            >
                Edit Profile
            </button>
            {
                userGlobal.is_verified ?
                    <div
                        className="inline ml-3 mt-3 text-lg bg-green-500 text-white font-bold  px-3 border border-blue-700 rounded"
                    >Verified</div>
                    :
                    <button
                        className="ml-1 mt-3 bg-purple-500 hover:bg-purple-700 text-white font-bold  px-3 border border-blue-700 rounded"
                        onClick={() => navigate('/users/resend-verification')}
                    >
                        Re-send Verification Email
                    </button>
            }

        </div>
    )
}

export default Profile