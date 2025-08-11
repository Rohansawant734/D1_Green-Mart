package com.greenmart.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.Supplier;


public interface SupplierDao extends JpaRepository<Supplier, Long> {

	Supplier findByEmail(String email);
	}


