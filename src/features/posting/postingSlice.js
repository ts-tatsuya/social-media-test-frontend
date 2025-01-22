import { createSlice } from '@reduxjs/toolkit'
import Axios from 'axios'

export const postingSlice = createSlice({
    name: 'posting',
    initialState: {
        postingList: [],
        postingRenderList: [],
        postingPage: 1,
        posting: {
            id: 0,
            userId: "",
            captions: "",
            postingImgUrl: "",
            createdDate: "",
            username: "",
            numberOfLikes: 0
        },
        topFiveComments: []
    },
    reducers: {
        setPostingList: (state, action) => {
            state.postingList = action.payload
            console.log('posting list: ' + state.postingRenderList.length);
            console.log(state.postingPage);
            console.log(action.payload.page)
            if (action.payload.page != 1) {

                console.log('this is concat');
                state.postingRenderList = state.postingRenderList.concat(action.payload.data);
            } else {
                state.postingRenderList = action.payload.data;
            }
            state.postingPage = action.payload.page
        },
        setPosting: (state, action) => {
            console.log(state.posting);
            state.posting = action.payload
        },
        setFiveComments: (state, action) => {
            state.topFiveComments = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setPostingList, setPosting } = postingSlice.actions

export default postingSlice.reducer

export function getPostingById(postingId) {
    return async (dispatch) => {
        const posting = await Axios.get('http://localhost:8001/postings/posting/' + postingId)
        const comments = await Axios.get('http://localhost:8001/postings/posting/' + postingId + '/comments/five-recents')
        console.log(posting)
        console.log(comments)
        dispatch(setPosting({
            postingDetails: posting.data.data,
            comments: comments.data
        }))
    }
}

export function fetchPostings(page) {
    return async (dispatch) => {
        console.log('isrunning');
        let { data } = await Axios.get('http://localhost:8001/postings?page=' + page)
        console.log(data);
        dispatch(setPostingList(data))
    }
}