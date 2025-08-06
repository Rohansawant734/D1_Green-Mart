package com.greenmart.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.User;
import com.greenmart.entities.UserRole;


public interface UserRepository extends JpaRepository<User, Long>{
	 List<User> findByIsDeletedFalse();
}
