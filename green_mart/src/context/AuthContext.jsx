import { createContext, useContext, useEffect, useState } from "react";
import { getUser, loginUser, registerUser, updatePassword, updateUser } from "../services/user";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const expiry = localStorage.getItem('tokenExpiry')

        if (storedUser && storedUser !== "undefined" && token) {
            try {
                const expirationTime = parseInt(expiry)

                if (expirationTime && Date.now() < expirationTime) {
                    setAuthUser(JSON.parse(storedUser))
                    setUpAutoLogout(parseInt(expiry));
                }
                else {
                    logout() // force logout if token already expired
                }
            }
            catch (e) {
                console.error("Failed to parse stored used: ", e)
                logout() // to prevent crashing if parse is failing
            }
        }
        else {
            logout()
        }
        setLoading(false)
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await loginUser(email, password)

            if (!response || !response.token) {
                throw new Error('Invalid response from server')
            }
            const { token, ...userData } = response
            // console.log("Login response: ", response);
            // console.log("Extracted userData: ", userData);
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
        catch (e) {
            console.error("Login failed, password or email is incorrect: ", e)
            return { success: false, error: e.response?.data?.message || 'Login failed, password or email is incorrect' }
        }
    }

    const logout = () => {
        if (!authUser && token) {
            return
        }

        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('tokenExpiry')
        setAuthUser(null);
        setToken(null);
    }

    const register = async (firstName, lastName, email, phone, password) => {
        try {
            const response = await registerUser(firstName, lastName, email, phone, password)

            return { success: true };
        }
        catch (e) {
            return {
                success: false,
                error: e.response?.data?.message || 'Registration failed due to invalid format or empty fields'
            }
        }
    };

    const fetchProfile = async () => {
        try {
            let userId;

            if (!authUser && token) {
                const decoded = jwtDecode(token)
                userId = decoded.userId
            }
            else if (authUser) {
                userId = authUser.userId
            }
            else {
                throw new Error("There is no user Id available")
            }

            const data = await getUser(userId)

            localStorage.setItem("user", JSON.stringify(data))

            setAuthUser(data)

            return { success: true, data }
        }
        catch (e) {
            console.error("Failed to get user's profile: ", e)
            return { success: false, error: e.response?.data?.message || "Failed to fetch user" }
        }
    }

    const updateProfile = async (firstName, lastName, email, phone) => {
        try {
            const updatedUser = await updateUser(authUser.userId, firstName, lastName, email, phone)

            if (!updatedUser) {
                throw new Error("Profile update failed");
            }

            // Just update the context, not localStorage
            setAuthUser((prev) => ({
                ...prev,
                ...updatedUser
            }));

            toast.success("Successfully updated profile");

            return { success: true };
        }
        catch (e) {
            console.error("Failed to update profile: ", e)
            return { success: false, error: e.response?.data?.message || "Failed to update profile" }
        }
    }

    const changePassword = async (oldPassword, newPassword) => {
        try {
            await updatePassword(authUser.userId, oldPassword, newPassword);

            return { success: true }
        }
        catch (e) {
            return { success: false, error: e.response?.data?.message || "Failed to update password. Old password is incorrect" }

        }
    }

    const setUpAutoLogout = (expirationTime) => {
        const currentTime = Date.now();
        const timeout = expirationTime - currentTime;

        if (timeout > 0) {
            setTimeout(() => {
                logout()
                toast.info("Session expired. Please log in again.")

                if (authUser?.userRole === 'ADMIN') {
                    navigate('/login')
                }
                else {
                    navigate('/')
                }
            }, timeout)
        }
        else {
            logout() // force logout if token already expired

            if (authUser?.userRole === 'ADMIN') {
                navigate('/login')
            }
            else {
                navigate('/')
            }
        }
    }

    return (
        <AuthContext.Provider value={
            { authUser, token, login, logout, register, loading, fetchProfile, updateProfile, changePassword }
        }>
            {children}
        </AuthContext.Provider>
    )
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext)