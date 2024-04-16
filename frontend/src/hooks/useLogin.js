import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// Custom hook for handling user login
export const useLogin = () => {
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    // Function to handle user login
    const login = async (email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${BACKEND_URL}/api/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })
        console.log(response.error)
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            //update the auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            setError(null)
        }
    }

    return {login, isLoading, error}
}