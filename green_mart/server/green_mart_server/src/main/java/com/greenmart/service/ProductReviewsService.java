package com.greenmart.service;

import java.util.List;

import com.greenmart.dto.AddReviewDTO;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.ReviewResponseDTO;

public interface ProductReviewsService {

	ApiResponse addReview(Long userId, Long productId, AddReviewDTO dto);
	
	ApiResponse updateReview(Long userId,Long reviewId, AddReviewDTO dto);
	
	ApiResponse deleteReview(Long userId, Long productId, Long reviewId);
	
	List<ReviewResponseDTO> findAllReviewsForUser(Long userId);
	
	ReviewResponseDTO findReviewByUserId(Long userId, Long reviewId);
	
	List<ReviewResponseDTO> findAllReviewsForProduct(Long productId);
	
	ReviewResponseDTO findReviewByProductId(Long productId, Long reviewId);
}
