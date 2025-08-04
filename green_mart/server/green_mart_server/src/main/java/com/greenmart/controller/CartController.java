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

import com.greenmart.dto.CartDTO;
import com.greenmart.service.CartService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor
 
@CrossOrigin(origins = "http://localhost:5173")

public class CartController {
	
	private final CartService cartservice;
	
	@GetMapping("/{userId}")
	@Operation(description = "get the cart ")
	public ResponseEntity<?>getCart(@PathVariable Long userId){
		
		CartDTO cartDTO=cartservice.getCartByUserId(userId);
		return ResponseEntity.ok(cartDTO);
		
	}
	
	@PostMapping("/add")
	@Operation(description = "Add to cart")
	public ResponseEntity<?>addTocart(@RequestParam Long userID,@RequestParam Long productId, @RequestParam int quantity){
		return ResponseEntity.ok(cartservice.addItemToCart(userID, productId, quantity));
		
	}
	  @PutMapping("/update")
	  @Operation(description = "Update the cartItems")
	    public ResponseEntity<?> updateCartItem(@RequestParam Long userId, @RequestParam Long productId, @RequestParam int quantity) {
	        return ResponseEntity.ok(cartservice.updateCartItem(userId, productId, quantity));
	    }
	  @DeleteMapping("/remove")
	  @Operation(description = "Remove the Cart")
	    public ResponseEntity<?> removeItem(@RequestParam Long userId, @RequestParam Long productId) {
	        return ResponseEntity.ok(cartservice.removeItemFromCart(userId, productId));
	    }
	  @DeleteMapping("/clear/{userId}")
	    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
	        return ResponseEntity.ok(cartservice.clearCart(userId));
	    }

}
