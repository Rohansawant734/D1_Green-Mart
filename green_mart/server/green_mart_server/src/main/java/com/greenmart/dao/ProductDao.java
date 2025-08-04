package com.greenmart.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.Product;

public interface ProductDao extends JpaRepository<Product, Long> {
	boolean existsByProdName(String prodName);
}
