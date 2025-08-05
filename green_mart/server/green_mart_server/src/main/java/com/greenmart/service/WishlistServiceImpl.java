package com.greenmart.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenmart.custom_exceptions.ResourceNotFoundException;
import com.greenmart.dao.ProductDao;
import com.greenmart.dao.UserDao;
import com.greenmart.dao.WishlistDao;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.WishlistDTO;
import com.greenmart.entities.Product;
import com.greenmart.entities.User;
import com.greenmart.entities.Wishlist;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class WishlistServiceImpl implements WishlistService {
	private final WishlistDao wishlistDao;
	private final UserDao userDao;
	private final ProductDao productDao;
	private final ModelMapper modelMapper;

	/**
	 * Toggles a product in the user's wishlist. If the product exists, it is
	 * removed. Otherwise, it's added.
	 */

	@Override
	public ApiResponse toggleWishlist(Long userId, Long productId) {
		User user = userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		Product product = productDao.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found"));

		return wishlistDao.findByUserAndMyProduct(user, product).map(wishlist -> {
			wishlistDao.delete(wishlist);
			return new ApiResponse("Removed from wishlist");
		}).orElseGet(() -> {
			Wishlist newItem = new Wishlist();
			newItem.setUser(user);
			newItem.setMyProduct(product);
			wishlistDao.save(newItem);
			return new ApiResponse("Added to wishlist");
		});

	}

	@Override
	public List<WishlistDTO> getWishlistByUser(Long userId) {
		User user = userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

		return wishlistDao.findByUser(user).stream().map(w -> convertToDTO(w)).collect(Collectors.toList());
	}

	/**
	 * Custom mapping logic for Wishlist to WishlistDTO using ModelMapper manually.
	 */
	private WishlistDTO convertToDTO(Wishlist wishlist) {
		WishlistDTO dto = modelMapper.map(wishlist, WishlistDTO.class);
		dto.setProductId(wishlist.getMyProduct().getId());
		dto.setProductName(wishlist.getMyProduct().getProdName());
		dto.setProductImage(wishlist.getMyProduct().getProdImgUrl());
		dto.setOfferPrice(wishlist.getMyProduct().getOfferPrice());
		dto.setDescription(wishlist.getMyProduct().getDescription());
		return dto;
	}
}
