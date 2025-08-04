package com.greenmart.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenmart.custom_exceptions.ResourceNotFoundException;
import com.greenmart.dao.CartDao;
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
	private  final CartDao cartDao;
	private final UserDao userDao;
	private final ProductDao productDao;
	private ModelMapper modelMapper;
	
	
	@Override
	public CartDTO getCartByUserId(Long userId) {
		 User user = userDao.findById(userId)
		            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

		    Cart cart = cartDao.findByCartUser(user)
		            .orElseGet(() -> cartDao.save(new Cart(user)));

		    CartDTO cartDTO = new CartDTO();
		    cartDTO.setCartId(cart.getId());
		    cartDTO.setUserId(userId);

		    List<CartItemDTO> cartItemDTOs = cart.getItems().stream().map(item -> {
		        CartItemDTO dto = modelMapper.map(item, CartItemDTO.class);

		        // Set nested product data manually
		        dto.setProductId(item.getMyProduct().getId());
		        dto.setProductName(item.getMyProduct().getProdName());
		        dto.setImageUrl(item.getMyProduct().getProdImgUrl());
		        dto.setOfferPrice(item.getMyProduct().getOfferPrice());

		        return dto;
		    }).toList();

		    cartDTO.setItems(cartItemDTOs);

		    return cartDTO;
	}


	@Override
	public ApiResponse addItemToCart(Long userID, Long productId, int quantity) {
		 User user = userDao.findById(userID)
	                .orElseThrow(() -> new ResourceNotFoundException("Invalid user ID"));
	        Product product = productDao.findById(productId)
	                .orElseThrow(() -> new ResourceNotFoundException("Invalid product ID"));

	        Cart cart = cartDao.findByCartUser(user).orElseGet(() -> {
	            Cart newCart = new Cart();
	            newCart.setCartUser(user);
	            return cartDao.save(newCart);
	        });

	        CartItem existing = cart.getItems().stream()
	                .filter(item -> item.getMyProduct().getId().equals(productId))
	                .findFirst()
	                .orElse(null);

	        if (existing != null) {
	            existing.setQuantity(existing.getQuantity() + quantity);
	        } else {
	            CartItem newItem = new CartItem();
	            newItem.setCart(cart);
	            newItem.setMyProduct(product);
	            newItem.setQuantity(quantity);
	            cart.getItems().add(newItem);
	        }
	        	cartDao.save(cart);
	        return new ApiResponse("Item added to cart.");
	}


	@Override
	public ApiResponse updateCartItem(Long userId, Long productId, int quantity) {
		Cart cart = cartDao.findFullCartByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getMyProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Item not found in cart"));

        item.setQuantity(quantity);
        cartDao.save(cart);
        return new ApiResponse("Item quantity updated.");	}


	@Override
	public ApiResponse removeItemFromCart(Long userId, Long productId) {
		 Cart cart = cartDao.findFullCartByUserId(userId)
	                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

	        cart.getItems().removeIf(item -> item.getMyProduct().getId().equals(productId));
	        return new ApiResponse("Item removed from cart.");
	}


	@Override
	public ApiResponse clearCart(Long userId) {
		 Cart cart = cartDao.findFullCartByUserId(userId)
	                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

	        cart.getItems().clear();
	        return new ApiResponse("Cart cleared.");
	    }
	
}

	


