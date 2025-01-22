import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function PostingCard(props) {
    const navigate = useNavigate();
    const { posting } = props;

    return (
        <a
            href={`/posting/${posting.id}/details`}
            className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
            onClick={() => navigate(`/posting/${posting.id}/details`)}
        >
            <button
                className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
                onClick={() => navigate(`/posting/${posting.id}/details`)}
            >

                <p>{posting.username}</p>
                <p>{posting.captions}</p>
                <img src={'http://localhost:8001/' + posting.post_image_url}></img>
                <p>{posting.created_date} UTC</p>
                <p>Likes: {posting.number_of_likes}</p>
            </button>
        </a>
    )
}

export default PostingCard