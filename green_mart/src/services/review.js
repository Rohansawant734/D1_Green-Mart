import axios from './axiosInstance'
import { toast } from 'react-toastify';

export async function addReview(userId, productId, comment, ratings) {
    try {
        const url = `/reviews/${userId}/${productId}`

        const body = { comment, ratings }

        const response = await axios.post(url, body)

        toast.success("Review added successfully!", { position: "top-right" })

        return response.data
    } 
    catch (error) {
        console.error("Exception: ", error)

        toast.error(error.response?.data?.message || "Failed to add review", { position: "top-right" })

        return { success: false, error: error.response?.data || error.message }
    }
}

export async function getAllUserReviews(userId) {
    try {
        const url = `/reviews/${userId}`

        const response = await axios.get(url)

        toast.success("Fetched user reviews successfully!", { position: "top-right" })

        return response.data
    } 
    catch (error) {
        console.error("Exception: ", error)

        toast.error(error.response?.data?.message || "Failed to fetch user reviews", { position: "top-right" })

        return { success: false, error: error.response?.data || error.message }
    }
}

export async function getAllProductReviews(productId) {
    try {
        const url = `/reviews/product/${productId}`

        const response = await axios.get(url)
        return response.data
    } 
    catch (error) {
        console.error("Exception: ", error)

        toast.error(error.response?.data?.message || "Failed to fetch product reviews", { position: "top-right" })

        return { success: false, error: error.response?.data || error.message }
    }
}

export async function getUserReview(userId, reviewId) {
    try {
        const url = `/reviews/${userId}/${reviewId}`

        const response = await axios.get(url)

        toast.success("Fetched review successfully!", { position: "top-right" })

        return response.data
    } 
    catch (error) {
        console.error("Exception: ", error)

        toast.error(error.response?.data?.message || "Failed to fetch review", { position: "top-right" })

        return { success: false, error: error.response?.data || error.message }
    }
}

export async function getProductReview(productId, reviewId) {
    try {
        const url = `/reviews/product/${productId}/${reviewId}`

        const response = await axios.get(url)

        toast.success("Fetched product review successfully!", { position: "top-right" })

        return response.data
    } 
    catch (error) {
        console.error("Exception: ", error)

        toast.error(error.response?.data?.message || "Failed to fetch product review", { position: "top-right" })

        return { success: false, error: error.response?.data || error.message }
    }
}

export async function updateReview(userId, reviewId, comment, ratings) {
    try {
        const url = `/reviews/${userId}/${reviewId}`

        const body = { comment, ratings }

        const response = await axios.put(url, body)

        toast.success("Review updated successfully!", { position: "top-right" })

        return response.data
    } 
    catch (error) {
        console.error("Exception: ", error)

        toast.error(error.response?.data?.message || "Failed to update review", { position: "top-right" })

        return { success: false, error: error.response?.data || error.message }
    }
}

export async function deleteReview(userId, productId, reviewId) {
    try {
        const url = `/reviews/${userId}/${productId}/${reviewId}`

        const response = await axios.delete(url)

        toast.success("Review deleted successfully!", { position: "top-right" })

        return response.data
    } 
    catch (error) {
        console.error("Exception: ", error)

        toast.error(error.response?.data?.message || "Failed to delete review", { position: "top-right" })

        return { success: false, error: error.response?.data || error.message }
    }
}
