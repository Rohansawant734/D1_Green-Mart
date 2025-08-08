package com.greenmart.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.User;
import com.greenmart.entities.UserRole;

public interface AdminDao extends JpaRepository<User, Long>{
	List<User> findByUserRole(UserRole userRole);
	
	Optional<User> findByIdAndUserRole(Long userId, UserRole userRole);
}
