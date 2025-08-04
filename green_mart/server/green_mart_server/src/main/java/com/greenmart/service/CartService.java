package com.greenmart.service;

import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.CartDTO;

public interface CartService {

	CartDTO getCartByUserId(Long userId);

	ApiResponse addItemToCart(Long userID, Long productId, int quantity);

	ApiResponse updateCartItem(Long userId, Long productId, int quantity);

	ApiResponse removeItemFromCart(Long userId, Long productId);

	ApiResponse clearCart(Long userId);

	

	 

	 
}
