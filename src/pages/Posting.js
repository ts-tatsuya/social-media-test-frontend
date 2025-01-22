import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component'
import postingSlice, { fetchPostings } from "../features/posting/postingSlice";
import PostingCard from "../components/PostingCard";

function Posting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const postings = useSelector((state) => state.posting.postingList);
    const postingRender = useSelector((state) => state.posting.postingRenderList);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        dispatch(fetchPostings(page));
    }, [page]);

    const needToLoginFirst = () => {
        alert('You need to login first!!!');
        navigate('/login')
    }
    const renderPostingList = () => {
        if (postings.totalPostings - postings.count <= 0) {
            setHasMore(false);
        }
        console.log(postings);
        if (postings.data != undefined) {
            return postingRender.map((posting) => {
                return <PostingCard posting={posting} key={posting.id} />;
            });
        }
    };
    return (
        <div>
            <div>
                <button
                    className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => user.id ? user.is_verified ? navigate('/posting/new-posting') : navigate('/users/resend-verification') : needToLoginFirst()}
                >Create New Posting</button>
                <br></br>
                <InfiniteScroll
                    dataLength={postings.totalPostings ? postings.totalPostings : 0} //This is important field to render the next data
                    next={() => setPage(page + 1)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    {renderPostingList()}
                </InfiniteScroll>

            </div>
        </div>
    );
}

export default Posting;