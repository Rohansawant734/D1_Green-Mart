package com.greenmart.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.Address;

public interface AddressDao extends JpaRepository<Address, Long>{

}
