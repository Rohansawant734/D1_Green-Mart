package com.greenmart.service;

import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.CartDTO;

public interface CartService {

	CartDTO getCartByUserId(Long userId);

	ApiResponse addItemToCart(Long userId, Long productId, int quantity);

	ApiResponse removeItemFromCart(Long userId, Long productId);

	ApiResponse updateItemQuantity(Long userId, Long productId, int quantity);

	ApiResponse clearCart(Long userId);

}
