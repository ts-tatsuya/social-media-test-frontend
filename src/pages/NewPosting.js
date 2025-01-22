import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NewPosting() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [captions, setCaptions] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    const onCaptionsChange = (event) => {
        setCaptions(event.target.value);
        console.log(event.target.value);
        console.log(user.id);
    }
    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        let preview = document.getElementById("imagepreview");
        preview.src = URL.createObjectURL(event.target.files[0]);
    };

    const createNewPost = async () => {
        setIsLoading(true);
        if (file && captions != '') {
            const obj = {
                userId: user.id,
                captions: captions
            };

            let formData = new FormData();
            formData.append("postingImg", file);
            formData.append("data", JSON.stringify(obj));

            const response = await axios.post(
                "http://localhost:8001/postings/new",
                formData
            );
            if (!response.error) {
                setImageSrc(`http://localhost:8001/${response.data.filepath}`);
                alert("Upload Success");
                navigate('/posting')
            }
        } else if (captions == '') {
            alert("Caption must not be empty")
        } else {
            alert("Image cannot be empty");
        }
        setIsLoading(false);
    };

    return (
        <div>
            <div>
                <p>New Posting</p>
                <label>
                    <span>Captions</span>
                    <input
                        className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type='text'
                        id='captions'
                        placeholder='Captions'
                        onChange={(event) => {
                            onCaptionsChange(event);
                        }}
                    />
                </label>
                <div>
                    <p>{imageSrc}</p>
                    <img id="imagepreview" width="400px" height="400px" />
                    {imageSrc === "" ? null : (
                        <img src={imageSrc} width="400px" height="400px" />
                    )}
                </div>

                <div>
                    <div>
                        <div>
                            <div>
                                <div>

                                    <label
                                        htmlFor="file-upload"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            type="file"
                                            id="file"
                                            name="postingImg"
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
                        </div>
                    </div>
                    {/* <input
            type="file"
            id="file"
            onChange={(event) => {
              onFileChange(event);
            }}
          /> */}
                </div>

                {isLoading ? (
                    <button
                        className="group relative flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-slate-400"
                        onClick={createNewPost}
                        disabled
                    >
                        Create new post
                    </button>
                ) : (
                    <button
                        className="my-10 group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={createNewPost}
                    >
                        Create new post
                    </button>
                )}
            </div>
        </div>
    );
}

export default NewPosting