package com.greenmart.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenmart.entities.Category;

public interface CategoryDao extends JpaRepository<Category, Long> {
 boolean existsByCatName(String catName);
}
