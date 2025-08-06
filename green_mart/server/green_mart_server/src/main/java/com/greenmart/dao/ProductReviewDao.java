package com.greenmart.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.ProductReviews;

public interface ProductReviewDao extends JpaRepository<ProductReviews, Long>{

	List<ProductReviews> findByUserId(Long userId);
	Optional<ProductReviews> findByUserIdAndId(Long userId, Long reviewId);
	
	List<ProductReviews> findByMyProductId(Long productId);
	Optional<ProductReviews> findByMyProductIdAndId(Long productId, Long reviewId);
}
