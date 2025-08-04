package com.greenmart.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.Product;
import com.greenmart.entities.User;
import com.greenmart.entities.Wishlist;

public interface WishlistDao extends JpaRepository<Wishlist, Long> {

	// Get wishlist items for a user
	List<Wishlist> findByUser(User user);

	// Find specific product in user's wishlist
	Optional<Wishlist> findByUserAndMyProduct(User user, Product product);
}
