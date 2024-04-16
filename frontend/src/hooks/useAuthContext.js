import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Custom hook to access the authentication context
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    // Throw an error if the hook is used outside of AuthContextProvider
    if (!context) {
        throw Error("useAuthContext must be used inside and AuthContextProvider")
    }

    return context
}