import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/FilterReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from './reducers/notificationReducer'



const store = configureStore({
    reducer: {
        notification: notificationReducer,
        filter: filterReducer,
        anecdotes: anecdoteReducer
    }
})




export default store