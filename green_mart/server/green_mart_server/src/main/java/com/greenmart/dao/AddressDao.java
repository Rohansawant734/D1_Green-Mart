package com.greenmart.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.greenmart.entities.Address;

public interface AddressDao extends JpaRepository<Address, Long>{
	List<Address> findByUserIdAndIsDeletedFalse(Long userId);
	
	@Query("select a from Address a where a.user.id = :userId and a.id = :addrId and a.isDeleted = false")
	Optional<Address> findByUserIdAndIdAndIsDeletedFalse(@Param("userId") Long userId, @Param("addrId") Long addrId);

}
