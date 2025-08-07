package com.greenmart.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
 

import com.greenmart.entities.Address;

public interface AddressDao extends JpaRepository<Address, Long>{
	
	List<Address> findByUserId(Long userId);
	Optional<Address> findByUserIdAndId(Long userId, Long addrId);

	 
}
