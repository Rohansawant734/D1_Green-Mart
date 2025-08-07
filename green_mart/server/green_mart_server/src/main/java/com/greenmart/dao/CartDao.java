package com.greenmart.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.Cart;
import com.greenmart.entities.User;

public interface CartDao extends JpaRepository<Cart, Long> {

	Optional<Cart> findByCartUser(User user);
	Optional<Cart> findByCartUser_Id(Long userId);


}
