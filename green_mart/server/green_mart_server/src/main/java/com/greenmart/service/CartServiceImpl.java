package com.greenmart.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenmart.custom_exceptions.ResourceNotFoundException;
import com.greenmart.dao.CartDao;
import com.greenmart.dao.CartItemDao;
import com.greenmart.dao.ProductDao;
import com.greenmart.dao.UserDao;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.CartDTO;
import com.greenmart.dto.CartItemDTO;
import com.greenmart.entities.Cart;
import com.greenmart.entities.CartItem;
import com.greenmart.entities.Product;
import com.greenmart.entities.User;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CartServiceImpl implements CartService {

	private final CartDao cartDao;
	private final UserDao userDao;
	private final ProductDao productDao;
	private final CartItemDao cartItemDao;
	private final ModelMapper modelMapper;

	@Override
	public CartDTO getCartByUserId(Long userId) {
		User user = userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found" + userId));
		Cart cart = cartDao.findByCartUser(user).orElseGet(() -> {
			Cart newCart = new Cart(user);
			return cartDao.save(newCart);
		});

		List<CartItemDTO> items = cart.getItems().stream().map(item -> {
			CartItemDTO dto = new CartItemDTO();
			dto.setProductId(item.getMyProduct().getId());
			dto.setProductName(item.getMyProduct().getProdName());
			dto.setImageUrl(item.getMyProduct().getProdImgUrl());
			dto.setOfferPrice(item.getMyProduct().getOfferPrice());
			dto.setQuantity(item.getQuantity());
			return dto;
		}).collect(Collectors.toList());

		double total = items.stream().mapToDouble(i -> i.getOfferPrice() * i.getQuantity()).sum();

		return new CartDTO(items, total);
	}

	@Override
	public ApiResponse addItemToCart(Long userId, Long productId, int quantity) {
		User user = userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found" + userId));
		Product product = productDao.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found" + productId));

		Cart cart = cartDao.findByCartUser(user).orElseGet(() -> cartDao.save(new Cart(user)));

		Optional<CartItem> existingItem = cart.getItems().stream()
				.filter(i -> i.getMyProduct().getId().equals(productId)).findFirst();

		if (existingItem.isPresent()) {
			existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
		} else {
			CartItem newItem = new CartItem(quantity, cart, product);
			cart.addItem(newItem);
		}

		cartDao.save(cart);
		return new ApiResponse("Item added to cart");
	}

	@Override
	public ApiResponse removeItemFromCart(Long userId, Long productId) {
		CartDTO cartDTO = getCartByUserId(userId);

		User user = userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found" + userId));
		Cart cart = cartDao.findByCartUser(user)
				.orElseThrow(() -> new ResourceNotFoundException("Cart not found" + userId));

		cart.getItems().removeIf(item -> item.getMyProduct().getId().equals(productId));
		cartDao.save(cart);

		return new ApiResponse("Item removed from cart");
	}

	@Override
	public ApiResponse updateItemQuantity(Long userId, Long productId, int quantity) {
		User user = userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found" + userId));
		Cart cart = cartDao.findByCartUser(user)
				.orElseThrow(() -> new ResourceNotFoundException("Cart not found" + userId));

		cart.getItems().forEach(item -> {
			if (item.getMyProduct().getId().equals(productId)) {
				item.setQuantity(quantity);
			}
		});

		cartDao.save(cart);
		return new ApiResponse("Quantity updated");
	}

	@Override
	public ApiResponse clearCart(Long userId) {
	    User user = userDao.findById(userId)
	        .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

	    Cart cart = cartDao.findByCartUser(user)
	        .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user " + userId));

	    cart.getItems().clear();
	    cartDao.save(cart);

	    return new ApiResponse("Cart cleared successfully for user " + userId);
	}

}
