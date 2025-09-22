import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload
        case "CLEAR_NOTIFICATION":
            return ''
        default:
            return state
    }
 }

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, [])

    return (
        <AnecdoteContext.Provider value={[notification, notificationDispatch] }>
            {props.children}
        </AnecdoteContext.Provider>
    )
}


export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(AnecdoteContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(AnecdoteContext)
    return notificationAndDispatch[1]
}