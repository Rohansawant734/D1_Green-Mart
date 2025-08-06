import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() =>{
        const storedUser = localStorage.getItem('user')
        if(storedUser && token){
            setAuthUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [token]);

    const login = async (email, password) => {
        try{
            const response = await loginUser(email, password)
            const { token, ...userData} = response

            // Save token and user info
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(userData))

            setToken(token)
            setAuthUser(userData)
            
            return { success: true };
        }
        catch(error){
            console.error("Login failed: ", error)
            return { success: false, error: error.response?.data?.message || 'Login failed' }
        }
    }

    const logout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setAuthUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value = {
            { authUser, token, login, logout, loading }
        }>
            { children }
        </AuthContext.Provider>
    )
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext)