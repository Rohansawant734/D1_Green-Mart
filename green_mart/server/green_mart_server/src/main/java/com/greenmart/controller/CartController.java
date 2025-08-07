package com.greenmart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.dto.ApiResponse;
import com.greenmart.service.CartService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor

@CrossOrigin(origins = "http://localhost:5173")

public class CartController {

	private final CartService cartservice;

	@GetMapping("/user/{userId}")
	@Operation(description = "get the cart ")
	public ResponseEntity<?> getCart(@PathVariable Long userId) {

		return ResponseEntity.ok(cartservice.getCartByUserId(userId));

	}

	@PostMapping("/add")
	@Operation(description = "Add to cart")

	public ResponseEntity<ApiResponse> addToCart(@RequestParam Long userId, @RequestParam Long productId,
			@RequestParam int quantity) {
		return ResponseEntity.ok(cartservice.addItemToCart(userId, productId, quantity));
	}

	@PutMapping("/update")
	@Operation(description = "Update the cartItems")
	public ResponseEntity<ApiResponse> updateQuantity(@RequestParam Long userId, @RequestParam Long productId,
			@RequestParam int quantity) {
		return ResponseEntity.ok(cartservice.updateItemQuantity(userId, productId, quantity));
	}

	@DeleteMapping("/remove")
	@Operation(description = "Remove the Cart")
	public ResponseEntity<ApiResponse> removeFromCart(@RequestParam Long userId, @RequestParam Long productId) {
		return ResponseEntity.ok(cartservice.removeItemFromCart(userId, productId));
	}

	@DeleteMapping("/clear")
	public ResponseEntity<ApiResponse> clearCart(@RequestParam Long userId) {
	    return ResponseEntity.ok(cartservice.clearCart(userId));
	}


}
