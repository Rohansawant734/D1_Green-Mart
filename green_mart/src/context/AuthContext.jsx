import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/user";
import { toast } from "react-toastify";
import { jwtDecode}  from "jwt-decode"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() =>{
        const storedUser = localStorage.getItem('user')
        const expiry = localStorage.getItem('tokenExpiry')

        if(storedUser && token){
            const expirationTime = parseInt(expiry)
            
            if(expirationTime && Date.now() < expirationTime){
                setAuthUser(JSON.parse(storedUser))
                setUpAutoLogout(parseInt(expiry));
            }
            else{
                logout() // force logout if token already expired
            }
        }
        setLoading(false)
    }, [token]);

    const login = async (email, password) => {
        try{
            const response = await loginUser(email, password)

            if(!response || !response.token){
                throw new Error('Invalid response from server')
            }
            const { token, ...userData} = response

            const decoded = jwtDecode(token)
            const expiration = decoded.exp * 1000 // convert from seconds to ms

            // Save token and user info
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.setItem('tokenExpiry', expiration)

            setToken(token)
            setAuthUser(userData)
            
            // Sets auto logout timer
            setUpAutoLogout(expiration)

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
        localStorage.removeItem('tokenExpiry')
        setAuthUser(null);
        setToken(null);
    }

    const register = async (firstName, lastName, email, phone, password) => {
        try{
            const response = await registerUser(firstName, lastName, email, phone, password)

            return { success: true };
        }
        catch(error){
            return{
                success: false,
                error: error.response?.data?.message || 'Registration failed'
            }
        }
    };

    const setUpAutoLogout = (expirationTime) =>{
        const currentTime = Date.now();
        const timeout = expirationTime - currentTime;

        if(timeout > 0){
            setTimeout(() =>{
                logout()
                toast.info("Session expired. Please log in again.")
            }, timeout)
        }
        else{
            logout() // force logout if token already expired
        }
    }

    return (
        <AuthContext.Provider value = {
            { authUser, token, login, logout, register, loading }
        }>
            { children }
        </AuthContext.Provider>
    )
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext)