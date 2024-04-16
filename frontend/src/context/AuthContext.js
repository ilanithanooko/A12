import { createContext, useReducer, useEffect} from 'react'

export const AuthContext = createContext()

// Reducer function to handle authentication state changes
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

// AuthContextProvider component to manage authentication state
export const AuthContextProvider = ({ children }) => {
    // Initialize authentication state using reducer
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // Load user data from local storage on component mount
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user) {
            dispatch({type: 'LOGIN',payload: user})
        }
    }, [])

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
} 