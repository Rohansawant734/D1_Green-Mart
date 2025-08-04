package com.greenmart.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.greenmart.entities.Cart;
import com.greenmart.entities.User;

public interface CartDao extends JpaRepository<Cart,Long> {

	Optional<Cart> findByCartUser(User user);
	 @Query("SELECT c FROM Cart c JOIN FETCH c.items i JOIN FETCH i.myProduct WHERE c.cartUser.id = :userId")
	    Optional<Cart> findFullCartByUserId(@Param("userId") Long userId);
}
