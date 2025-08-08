package com.greenmart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.dto.AddReviewDTO;
import com.greenmart.dto.ReviewResponseDTO;
import com.greenmart.service.ProductReviewsService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@Validated
public class ProductReviewController {

	private final ProductReviewsService pRService;
	
	@GetMapping("/{userId}")
	public ResponseEntity<?> getAllReviewsForUser(@PathVariable Long userId){
		
		List<ReviewResponseDTO> pRList = pRService.findAllReviewsForUser(userId);
		return ResponseEntity.ok(pRList);
	}
	
	@GetMapping("/{userId}/{reviewId}")
	public ResponseEntity<?> getReviewOfUser(@PathVariable Long userId, @PathVariable Long reviewId){
		
		return ResponseEntity.ok(pRService.findReviewByUserId(userId, reviewId));
	}
	
	@GetMapping("/product/{productId}")
	public ResponseEntity<?> getAllReviewsForProduct(@PathVariable Long productId){
		
		List<ReviewResponseDTO> pRList = pRService.findAllReviewsForProduct(productId);
		return ResponseEntity.ok(pRList);
	}
	
	@GetMapping("/product/{productId}/{reviewId}")
	public ResponseEntity<?> getReviewOfProduct(@PathVariable Long productId, @PathVariable Long reviewId){
		
		return ResponseEntity.ok(pRService.findReviewByProductId(productId, reviewId));
	}
	
	@PostMapping("/{userId}/{productId}")
	public ResponseEntity<?> addReview(@PathVariable Long userId, @PathVariable Long productId, @RequestBody @Valid AddReviewDTO dto){
		
		return ResponseEntity.status(HttpStatus.CREATED).body(pRService.addReview(userId, productId, dto));
	}
	
	@PutMapping("/{userId}/{reviewId}")
	public ResponseEntity<?> updateReview(@PathVariable Long userId, @PathVariable Long reviewId, @RequestBody @Valid AddReviewDTO dto){
		
		return ResponseEntity.ok(pRService.updateReview(userId, reviewId, dto));
	}
	
	@DeleteMapping("/{userId}/{productId}/{reviewId}")
	public ResponseEntity<?> deleteReview(@PathVariable Long userId, @PathVariable Long productId, @PathVariable Long reviewId){
		
		return ResponseEntity.ok(pRService.deleteReview(userId, productId,reviewId));
	}		
}
