package com.greenmart.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.CartItem;

public interface CartItemDao extends JpaRepository<CartItem, Long> {

}
