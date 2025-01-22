import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getPostingById } from "../features/posting/postingSlice";
import CommentCard from '../components/CommentCard';
import axios from 'axios';
function PostingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posting = useSelector((state) => state.posting.posting);
    const userGlobal = useSelector((state) => state.user.user);
    const [isEditing, setIsEditing] = useState(false);
    const [newCaptions, setNewCaptions] = useState('');
    const [defaultCaptions, setDefaultCaptions] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    useEffect(() => {
        dispatch(getPostingById(id));
    }, [])

    const deletePost = async () => {
        try {
            setIsLoading(true);
            let response = await axios.delete('http://localhost:8001/postings/delete/' + userGlobal.id + '/' + id);
            console.log(response);
            if (response.data.success) {
                console.log(response);
                setIsLoading(false);
                setShowDeleteConfirmation(false);
                alert('Posting successfuly deleted');
                navigate('/posting');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editCaptions = () => {
        setIsEditing(true);
        setDefaultCaptions(posting.postingDetails.captions);
    }
    const cancelEdit = () => {
        setIsEditing(false);
        setNewCaptions('');
    }
    const applyEdit = async () => {
        try {
            const value = {
                userId: userGlobal.id,
                postingId: posting.postingDetails.id,
                captions: newCaptions
            };
            console.log(value);
            setIsLoading(true);
            let response = await axios.patch("http://localhost:8001/postings/posting/edit", value);
            alert(response.data.message);
            setIsLoading(false);
            setIsEditing(false);
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    }
    const renderFiveComments = () => {
        if (posting.comments.comments != undefined) {
            return posting.comments.comments.map((comment) => {
                console.log(comment);
                return <CommentCard
                    comments={comment.comments}
                    username={comment.username}
                    createdDate={comment.created_date}
                    key={comment.id}
                />;
            });
        }
    };
    return (
        <div className='mt-10'>
            {
                posting.postingDetails ?
                    <div>
                        <div className='my-3'>
                            {
                                posting.postingDetails.user_id == userGlobal.id ?
                                    <div>
                                        {
                                            isEditing ?
                                                <div>
                                                    <input
                                                        className='pr-10 text-5xl'
                                                        defaultValue={defaultCaptions}
                                                        onChange={(e) => setNewCaptions(e.target.value)}
                                                    />
                                                    {
                                                        isLoading ?
                                                            <div>
                                                                <button
                                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold  px-3 border border-blue-700 rounded opacity-50 cursor-not-allowed"
                                                                    onClick={() => cancelEdit()}
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold  px-3 border border-blue-700 rounded opacity-50 cursor-not-allowed"
                                                                    onClick={() => applyEdit()}
                                                                >
                                                                    Apply
                                                                </button>
                                                            </div>
                                                            :
                                                            <div>
                                                                <button
                                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold  px-3 border border-blue-700 rounded"
                                                                    onClick={() => cancelEdit()}
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold  px-3 border border-blue-700 rounded"
                                                                    onClick={() => applyEdit()}
                                                                >
                                                                    Apply
                                                                </button>
                                                            </div>
                                                    }
                                                </div>
                                                :
                                                <div>
                                                    <h2 className='inline pr-10 text-5xl'>{posting.postingDetails.captions}</h2>
                                                    <button
                                                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold  px-3 border border-blue-700 rounded"
                                                        onClick={() => editCaptions()}
                                                    >
                                                        Edit Post
                                                    </button>
                                                    {
                                                        showDeleteConfirmation ?
                                                            <div>
                                                                Are you sure?
                                                                {
                                                                    isLoading ?
                                                                        <div>
                                                                            <button
                                                                                className="bg-green-500 hover:bg-green-700 text-white font-bold  px-3 border border-blue-700 rounded opacity-50 cursor-not-allowed"
                                                                                onClick={() => setShowDeleteConfirmation(false)}
                                                                            >
                                                                                No
                                                                            </button><button
                                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold  px-3 border border-blue-700 rounded opacity-50 cursor-not-allowed"
                                                                                onClick={() => deletePost()}
                                                                            >
                                                                                Yes
                                                                            </button>
                                                                        </div>
                                                                        :
                                                                        <div>
                                                                            <button
                                                                                className="bg-green-500 hover:bg-green-700 text-white font-bold  px-3 border border-blue-700 rounded"
                                                                                onClick={() => setShowDeleteConfirmation(false)}
                                                                            >
                                                                                No
                                                                            </button><button
                                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold  px-3 border border-blue-700 rounded"
                                                                                onClick={() => deletePost()}
                                                                            >
                                                                                Yes
                                                                            </button>
                                                                        </div>
                                                                }

                                                            </div>
                                                            :
                                                            <button
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold  px-3 border border-blue-700 rounded"
                                                                onClick={() => setShowDeleteConfirmation(true)}
                                                            >
                                                                Delete Post
                                                            </button>
                                                    }
                                                </div>

                                        }
                                    </div>
                                    :
                                    <h2 className='inline pr-10 text-5xl'>{posting.postingDetails.captions}</h2>
                            }
                        </div>
                        <p>Posted by {posting.postingDetails.username}</p>
                        <img src={'http://localhost:8001' + posting.postingDetails.post_image_url}></img>
                        <p>Posted at {posting.postingDetails.created_date} UTC</p>
                        <p className='mt-10 text-xl'>Comments</p>
                        <div>{posting.comments.comments.length <= 0 ? 'No Comment Available' : renderFiveComments()}</div>

                    </div>
                    :
                    <div></div>
            }
        </div>
    )
}

export default PostingDetails