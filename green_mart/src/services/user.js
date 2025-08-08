import axios from './axiosInstance'

export async function registerUser(
    firstName,
    lastName,
    email,
    phone,
    password
){
    try{
        // create url
        const url = `/users/signup`

        //create the body
        const body = {
            firstName,
            lastName,
            email,
            phone,
            password
        }

        // make the API call
        const response = await axios.post(url, body)

        // return the response body
        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        throw error
    }
}

export async function loginUser(email, password){
    try{
        // create url
        const url = `/users/signin`

        // create the body
        const body = {
            email,
            password
        }

        // make the API call
        const response = await axios.post(url, body)

        // return the response body
        return response.data
    }
    catch(error){
        if(error.response){
            throw { response: error.response }
        }
        throw error;
    }
}

export async function getAllUsers(){
    try{
        const url = `/users`

        const response = await axios.get(url)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        throw error
    }
}

export async function getUser(userId){
    try{
        const url = `/users/${userId}`

        const response = await axios.get(url)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        throw error
    }
}

export async function updateUser(userId, firstName, lastName, email, phone){
    try{
        const url = `/users/${userId}`

        const body = {
            firstName,
            lastName,
            email,
            phone
        }

        const response = await axios.put(url, body)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        throw error
    }
}

export async function deleteUser(userId){
    try{
        const url = `/users/${userId}`

        const response = await axios.delete(url)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        throw error
    }
}

export async function restoreUser(userId){
    try{
        const url = `/users/${userId}/restore`

        const response = await axios.put(url)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        throw error
    }
}

export async function updatePassword(userId, oldPassword, newPassword){
    try{
        const url = `/users/${userId}/password`

        const body = {
            oldPassword,
            newPassword
        }

        const response = await axios.patch(url, body)
        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        throw error
    }
}