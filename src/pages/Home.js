import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Home() {

    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.user.user);
    return (
        <div>
            {/* {userLogin.id ? <p>{userLogin.username}</p> : <p></p>}
            {userLogin.id ? <div></div> : <button onClick={() => navigate('/login')}>Login</button>}
            {userLogin.id ? <div></div> : <button onClick={() => navigate('/register')}>Register</button>}
            <button onClick={() => navigate('/posting')}>Posting</button> */}

            

        </div>
    )
}

export default Home