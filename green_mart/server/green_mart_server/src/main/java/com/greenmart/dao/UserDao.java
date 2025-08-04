package com.greenmart.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.User;

public interface UserDao extends JpaRepository<User, Long>{

	List<User> findByisDeletedFalse();
}
