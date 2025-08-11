package com.greenmart.service;

import java.util.List;

import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.OrderDTO;
import com.greenmart.dto.OrderRequestDTO;
import com.greenmart.dto.OrderResponseDTO;
import com.greenmart.dto.OrderUpdateDTO;

 

public interface OrderService {
 
	
	 OrderResponseDTO placeOrder(OrderRequestDTO requestDTO);

	    List<OrderDTO> getOrdersByUserId(Long userId);

	    List<OrderDTO> getAllOrders();

	    OrderDTO getOrderById(Long orderId);
	    
	    ApiResponse updateOrder(Long orderId, OrderUpdateDTO updateDTO);
    
	    ApiResponse deleteOrder(Long orderId);

}
