import { createSlice } from "@reduxjs/toolkit";



const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state) {
            return ''
        }

    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer


export const createNotification = string => {
    return dispatch => {
        dispatch(setNotification(string))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 1000)
    }
}