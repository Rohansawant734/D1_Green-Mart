package com.greenmart.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

	}


