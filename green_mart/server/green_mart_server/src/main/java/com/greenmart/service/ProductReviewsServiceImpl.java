package com.greenmart.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.greenmart.custom_exceptions.NoContentException;
import com.greenmart.custom_exceptions.ResourceNotFoundException;
import com.greenmart.dao.ProductDao;
import com.greenmart.dao.ProductReviewDao;
import com.greenmart.dao.UserDao;
import com.greenmart.dto.AddReviewDTO;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.ReviewResponseDTO;
import com.greenmart.entities.Product;
import com.greenmart.entities.ProductReviews;
import com.greenmart.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ProductReviewsServiceImpl implements ProductReviewsService{

	private final ProductReviewDao prDao;
	private final UserDao uDao;
	private final ProductDao pDao;
	private final ModelMapper modelMapper;
	

	@Override
	public ApiResponse addReview(Long userId, Long productId, AddReviewDTO dto) {
		// Find the user by id
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		// Find the product by id
		Product productEntity = pDao.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Invalid product Id"));
		
		// Map the add review dto to product reviews entity
		ProductReviews pReviewsEntity = modelMapper.map(dto, ProductReviews.class);
		
	    // add the review for the particular user
		userEntity.addReview(pReviewsEntity);
		// add the review for the particular product
		productEntity.addReview(pReviewsEntity);
		
		// Save the state of the transient entity
		ProductReviews persistentReview = prDao.save(pReviewsEntity);
		
		// Return Api Response
		return new ApiResponse("Successfully added review with Id " + persistentReview.getId());
	}

	@Override
	public ApiResponse updateReview(Long userId, Long reviewId, AddReviewDTO dto) {
		// Find the user by id
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		// find the product review by using user id and review id
		ProductReviews pReviewsEntity = prDao.findByUserIdAndId(userId, reviewId).orElseThrow(() -> new ResourceNotFoundException("Review with the given id does not exist"));
		
		// Map the updated dto with the persistent entity
		modelMapper.map(dto, pReviewsEntity);
		
		// Save the state of the persistent entity
		ProductReviews updatedReview = prDao.save(pReviewsEntity);
		
		// Return Api Response
		return new ApiResponse("Sucessfully updated product with Id " + updatedReview.getId()) ;
	}

	@Override
	public ApiResponse deleteReview(Long userId, Long productId, Long reviewId) {
		// Find the user by id
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));

		// find the product by id
		Product productEntity = pDao.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Invalid product Id"));
		
		// find the review using user id and review id
		ProductReviews pReviewsEntity = prDao.findByUserIdAndId(userId, reviewId).orElseThrow(() -> new ResourceNotFoundException("Review with the given id does not exist"));
		
		// remove the review for the particular user
		userEntity.removeReview(pReviewsEntity);
		// remove the review for the particular user
		productEntity.removeReview(pReviewsEntity);
		
		// Delete the state of the persistent entity
		prDao.delete(pReviewsEntity);
		
		// Return Api Response
		return new ApiResponse("Succesfully deleted review");
	}

	@Override
	public List<ReviewResponseDTO> findAllReviewsForUser(Long userId) {
		// Find the user by id
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		// Get the list of reviews by using the user id
		List<ProductReviews> pRList = prDao.findByUserId(userId);
		
		// Check if the list is empty or not
		if(pRList.isEmpty()) {
			throw new NoContentException("No Reviews added yet by user with Id " + userId);
		}
		
		// Return the list in the form of dto. Manual map the user's firstname and lastname along with the name of the product
		return pRList.stream().map(review -> {
				ReviewResponseDTO dto =  modelMapper.map(review, ReviewResponseDTO.class);
				dto.setFirstName(review.getUser().getFirstName());
				dto.setLastName(review.getUser().getLastName());
				dto.setProductName(review.getMyProduct().getProdName());
				return dto;}).toList();
	}

	@Override
	public ReviewResponseDTO findReviewByUserId(Long userId, Long reviewId) {
		
		// Find the review by using the user id and review id
		ProductReviews pReviewsEntity = prDao.findByUserIdAndId(userId, reviewId).orElseThrow(() -> new ResourceNotFoundException("Review with the given id does not exist"));
		
		// Map the review to response dto.
		ReviewResponseDTO dto = modelMapper.map(pReviewsEntity, ReviewResponseDTO.class);
		dto.setFirstName(pReviewsEntity.getUser().getFirstName());
		dto.setLastName(pReviewsEntity.getUser().getLastName());
		dto.setProductName(pReviewsEntity.getMyProduct().getProdName());
		
		// Return the dto
		return dto;
	}

	@Override
	public List<ReviewResponseDTO> findAllReviewsForProduct(Long productId) {
		// Find the user by id
		Product productEntity = pDao.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Invalid product Id"));
		
		// Get the list of reviews by using the user id
		List<ProductReviews> pRList = prDao.findByMyProductId(productId);
		
		// Check if the list is empty or not
		if(pRList.isEmpty()) {
			throw new NoContentException("No Reviews added yet for product with Id " + productId);
		}
		
		// Return the list in the form of dto. Manual map the user's firstname and lastname along with the name of the product
		return pRList.stream().map(review -> {
				ReviewResponseDTO dto =  modelMapper.map(review, ReviewResponseDTO.class);
				dto.setFirstName(review.getUser().getFirstName());
				dto.setLastName(review.getUser().getLastName());
				dto.setProductName(review.getMyProduct().getProdName());
				return dto;}).toList();
	}

	@Override
	public ReviewResponseDTO findReviewByProductId(Long productId, Long reviewId) {
		// Find the review by using the user id and review id
		ProductReviews pReviewsEntity = prDao.findByMyProductIdAndId(productId, reviewId).orElseThrow(() -> new ResourceNotFoundException("Review with the given id does not exist"));
				
		// Map the review to response dto.
		ReviewResponseDTO dto = modelMapper.map(pReviewsEntity, ReviewResponseDTO.class);
		dto.setFirstName(pReviewsEntity.getUser().getFirstName());
		dto.setLastName(pReviewsEntity.getUser().getLastName());
		dto.setProductName(pReviewsEntity.getMyProduct().getProdName());
				
		// Return the dto
		return dto;
	}
}
