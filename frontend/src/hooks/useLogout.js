import { useAuthContext } from "./useAuthContext"
import { useTasksContext } from "./useTasksContext"

// Custom hook for handling user logout
export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch : tasksDispatch } = useTasksContext()

    // Function to handle user logout
    const logout = () => {
        //remnove user from local storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        // Dispatch action to reset tasks in tasks context
        tasksDispatch({type: 'SET_TASKS', payload: null})
    }

    return {logout}

}