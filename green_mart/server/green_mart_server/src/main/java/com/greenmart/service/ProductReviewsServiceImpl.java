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
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		Product productEntity = pDao.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Invalid product Id"));
		
		ProductReviews pReviewsEntity = modelMapper.map(dto, ProductReviews.class);
		userEntity.addReview(pReviewsEntity);
		productEntity.addReview(pReviewsEntity);
		
		ProductReviews persistentReview = prDao.save(pReviewsEntity);
		return new ApiResponse("Successfully added review with Id " + persistentReview.getId());
	}

	@Override
	public ApiResponse updateReview(Long userId, Long reviewId, AddReviewDTO dto) {
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		ProductReviews pReviewsEntity = prDao.findByUserIdAndId(userId, reviewId).orElseThrow(() -> new ResourceNotFoundException("Review with the given id does not exist"));
		
		modelMapper.map(dto, pReviewsEntity);
		
		ProductReviews updatedReview = prDao.save(pReviewsEntity);
		return new ApiResponse("Sucessfully updated product with Id " + updatedReview.getId()) ;
	}

	@Override
	public ApiResponse deleteReview(Long userId, Long productId, Long reviewId) {
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));

		Product productEntity = pDao.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Invalid product Id"));
		
		ProductReviews pReviewsEntity = prDao.findByUserIdAndId(userId, reviewId).orElseThrow(() -> new ResourceNotFoundException("Review with the given id does not exist"));
		
		userEntity.removeReview(pReviewsEntity);
		productEntity.removeReview(pReviewsEntity);
		
		prDao.delete(pReviewsEntity);
		return new ApiResponse("Succesfully deleted review");
	}

	@Override
	public List<ReviewResponseDTO> findAllReviews(Long userId) {
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		List<ProductReviews> pRList = prDao.findByUserId(userId);
		
		if(pRList.isEmpty()) {
			throw new NoContentException("No Reviews added yet");
		}
		return pRList.stream().map(review -> {
				ReviewResponseDTO dto =  modelMapper.map(review, ReviewResponseDTO.class);
				dto.setFirstName(review.getUser().getFirstName());
				dto.setLastName(review.getUser().getLastName());
				dto.setProductName(review.getMyProduct().getProdName());
				return dto;}).toList();
	}

	@Override
	public ReviewResponseDTO findReviewById(Long userId, Long reviewId) {
		
		ProductReviews pReviewsEntity = prDao.findByUserIdAndId(userId, reviewId).orElseThrow(() -> new ResourceNotFoundException("Review with the given id does not exist"));
		
		ReviewResponseDTO dto = modelMapper.map(pReviewsEntity, ReviewResponseDTO.class);
		dto.setFirstName(pReviewsEntity.getUser().getFirstName());
		dto.setLastName(pReviewsEntity.getUser().getLastName());
		dto.setProductName(pReviewsEntity.getMyProduct().getProdName());
		return dto;
	}
}
