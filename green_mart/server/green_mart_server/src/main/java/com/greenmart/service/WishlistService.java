package com.greenmart.service;

import java.util.List;

import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.WishlistDTO;

public interface WishlistService {
	 // Add or remove a product from wishlist
    ApiResponse toggleWishlist(Long userId, Long productId);

    // Fetch wishlist items for a user
    List<WishlistDTO> getWishlistByUser(Long userId);
}
