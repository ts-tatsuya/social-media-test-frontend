import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            id: "",
            username: "",
            email: "",
            fullname: "",
            bio: "",
            profileImgUrl: "",
            isVerified: false
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        resetUser: (state) => {
            state.user = {
                id: "",
                username: "",
                email: "",
                fullname: "",
                bio: "",
                profileImgUrl: "",
                isVerified: false
            }
        }
    }
})

export default userSlice.reducer
export const { setUser, resetUser } = userSlice.actions

export function loginUser(data) {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:8001/users/login', data)
        if (response.data.success) {
            dispatch(setUser(response.data.data))
            console.log(response);
            localStorage.setItem('user_token', response.data.token)
        } else {
            alert(response.data.message)
        }
    }
}

export function checkLogin(token) {
    return async (dispatch) => {
        try {
            let response = await axios.post('http://localhost:8001/users/check-login', {}, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            dispatch(setUser(response.data.data))

        } catch (error) {
            localStorage.removeItem('user_token');

        }
    }
}

export function logoutUser() {
    return async (dispatch) => {
        dispatch(resetUser())
        localStorage.removeItem('user_token')
    }
}