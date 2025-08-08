import axios from './axiosInstance'

export async function addReview(userId, productId, comment, ratings){
    try{
        const url = `/reviews/${userId}/${productId}`

        const body = {comment, ratings}

        const response = await axios.post(url, body)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        return { success: false, error: error.response?.data || error.message };
    }
}

export async function getAllUserReviews(userId){
    try{
        const url = `/reviews/${userId}`

        const response = await axios.get(url)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        return { success: false, error: error.response?.data || error.message };
    }
}

export async function getAllProductReviews(productId){
    try{
        const url = `/reviews/product/${productId}`

        const response = await axios.get(url)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        return { success: false, error: error.response?.data || error.message };
    }
}

export async function getUserReview(userId, reviewId){
    try{
        const url = `/reviews/${userId}/${reviewId}`

        const response = await axios.get(url)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        return { success: false, error: error.response?.data || error.message };
    }
}

export async function getProductReview(productId, reviewId){
    try{
        const url = `/reviews/product/${productId}/${reviewId}`

        const response = await axios.get(url)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        return { success: false, error: error.response?.data || error.message };
    }
}

export async function updateReview(userId, reviewId, comment, ratings){
    try{
        const url = `/reviews/${userId}/${reviewId}`

        const body = {comment, ratings}

        const response = await axios.put(url, body)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        return { success: false, error: error.response?.data || error.message };
    }
}

export async function deleteReview(userId, productId, reviewId){
    try{
        const url = `/reviews/${userId}/${productId}/${reviewId}`

        const response = await axios.delete(url)

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)
        return { success: false, error: error.response?.data || error.message };
    }
}