package com.greenmart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.WishlistDTO;
import com.greenmart.service.WishlistService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class WishlistController {

	private final WishlistService wishlistService;

	@PostMapping("/{userId}/{productId}")
	@Operation(description = "Adds a product to wishlist if not present; removes it otherwise")

	public ResponseEntity<?> toggleWishlist(@PathVariable Long userId, @PathVariable Long productId) {
		ApiResponse response = wishlistService.toggleWishlist(userId, productId);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/{userId}")
	@Operation(description = "Fetches all products present in the wishlist of a specific user")

	public ResponseEntity<?> getWishlist(@PathVariable Long userId) {

		List<WishlistDTO> wishlist = wishlistService.getWishlistByUser(userId);
		return ResponseEntity.ok(wishlist);
	}

}
