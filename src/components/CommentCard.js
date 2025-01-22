import React from 'react'

function CommentCard(props) {

    const { username, comments, createdDate } = props;

    return (
        <div className='pl-10 mt-10 bg-gray-200 rounded-full'>
            <p className='font-bold text-xl mb-1'>{username}</p>
            <p className=''>Commented at {createdDate} UTC</p>
            <p className='text-lg mt-5'>{comments}</p>
        </div>
    )
}

export default CommentCard