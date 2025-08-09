import { toast } from 'react-toastify'
import axios from './axiosInstance'

export async function placeOrder(userId, addressId, orderLines, paymentMethod, deliveryCharges){
    try{
        const url = `/orders/place`
        
        const body = {userId, addressId, orderLines, paymentMethod, deliveryCharges}

        const response = await axios.post(url, body)

        toast.success("Order place succesfully!")

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)

        toast.error(error.response?.data.message || "Order failed to be placed")

        return { success: false, error: error.response?.data || error.message}
    }
}

export async function getAllUserOrders(userId){
    try{
        const url = `/orders/user/${userId}`

        const response = await axios.get(url)

        toast.success("Successfully fetched all the user's orders!")

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)

        toast.error(error.response?.data.message || "Failed to fetched user's orders")

        return { success: false, error: error.response?.data || error.message}
    }
}

export async function getAllOrders(){
    try{
        const url = `/orders/admin/all`

        const response = await axios.get(url)

        toast.success("Successfully fetched all the orders!")

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)

        toast.error(error.response?.data.message || "Failed to fetched the orders")

        return { success: false, error: error.response?.data || error.message}
    }
}

export async function getOrdersOfUser(userId){
    try{
        const url = `/orders/admin/${userId}`

        const response = await axios.get(url)

        toast.success("Successfully fetched all the orders for the user!")

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)

        toast.error(error.response?.data.message || "Failed to fetched the orders for the user")

        return { success: false, error: error.response?.data || error.message}
    }
}

export async function updateOrder(orderId, orderStatus, paymentMethod, addressId){
    try{
        const url = `/orders/${orderId}`

        const body = {orderStatus, paymentMethod, addressId}

        const response = await axios.put(url, body)

        toast.success("Successfully updated the order!")

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)

        toast.error(error.response?.data.message || "Failed to update the order")

        return { success: false, error: error.response?.data || error.message}
    }
}

export async function deleteOrder(orderId){
    try{
        const url = `/orders/${orderId}`

        const response = await axios.delete(url)

        toast.success("Successfully deleted the order!")

        return response.data
    }
    catch(error){
        console.error("Exception: ", error)

        toast.error(error.response?.data.message || "Failed to delete the order")

        return { success: false, error: error.response?.data || error.message}
    }
}

