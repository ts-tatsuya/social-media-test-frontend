import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


function EditProfile() {
    const navigate = useNavigate();
    const userGlobal = useSelector((state) => state.user.user);
    const [isLoading, setIsLoading] = useState(false);
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [imageSrc, setImageSrc] = useState(userGlobal.profileImgUrl);
    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        let preview = document.getElementById("imagepreview");
        preview.src = URL.createObjectURL(event.target.files[0]);
    };

    const applyEdit = async () => {
        setIsLoading(true);

        let formData = new FormData();
        let data = {
            username: username,
            fullname: fullname,
            bio: bio
        };
        if (file) {
            formData.append("profileImg", file);
        }
        formData.append("data", data);
        formData.append("bio", bio);
        console.log(data);
        console.log(userGlobal.id);

        const response = await axios.patch(
            "http://localhost:8001/users/edit/" + userGlobal.id,
            formData
        );

        if (!response.error) {
            alert('Profile is updated');
            navigate('/profile');
        }
        setIsLoading(false);
    };
    return (
        <div>
            <input
                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={userGlobal.username}
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={userGlobal.fullname}
                placeholder='fullname'
                onChange={(e) => setFullname(e.target.value)}
            />
            <input
                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={userGlobal.bio}
                placeholder='bio'
                onChange={(e) => setBio(e.target.value)}
            />
            <div>
                <p>{imageSrc}</p>
                <img id="imagepreview" width="400px" height="400px" />
                {imageSrc === "" ? null : (
                    <img src={imageSrc} width="400px" height="400px" />
                )}
            </div>
            <div>
                <div>

                    <label
                        htmlFor="file-upload"
                    >
                        <span>Upload a file</span>
                        <input
                            type="file"
                            id="file"
                            name="profilePicture"
                            onChange={(event) => {
                                onFileChange(event);
                            }}
                        />
                    </label>
                </div>
                <p>
                    PNG, JPG, GIF up to 10MB
                </p>
            </div>
            {
                isLoading ?
                    <div>
                        <button
                            className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold  px-3 border border-blue-700 rounded opacity-50 cursor-not-allowed"
                            onClick={() => navigate('/profile')}
                        >
                            Cancel
                        </button>
                        <button
                            className="ml-5 bg-purple-500 hover:bg-purple-700 text-white font-bold  px-3 border border-blue-700 rounded opacity-50 cursor-not-allowed"
                            onClick={applyEdit}
                        >
                            Apply Changes
                        </button>
                    </div>
                    :
                    <div>
                        <button
                            className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold  px-3 border border-blue-700 rounded"
                            onClick={() => navigate('/profile')}
                        >
                            Cancel
                        </button>
                        <button
                            className="ml-5 bg-purple-500 hover:bg-purple-700 text-white font-bold  px-3 border border-blue-700 rounded"
                            onClick={applyEdit}
                        >
                            Apply Changes
                        </button>
                    </div>
            }

        </div>
    )
}

export default EditProfile