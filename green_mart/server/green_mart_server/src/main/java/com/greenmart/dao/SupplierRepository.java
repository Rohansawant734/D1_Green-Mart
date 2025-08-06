package com.greenmart.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.Supplier;
import java.util.List;


public interface SupplierRepository extends JpaRepository<Supplier, Long> {

	Supplier findByEmail(String email);
	}


