package com.greenmart.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.greenmart.entities.Product;

public interface ProductDao extends JpaRepository<Product, Long> {
	boolean existsByProdName(String prodName);
	
	@Query("SELECT p.myCategory.catName,COUNT(p) FROM Product p GROUP BY p.myCategory.catName")
	List<Object[]> countProductGroupByList();

    @Query("SELECT p.name, SUM(ol.quantity) AS totalSales " +
            "FROM OrderLine ol JOIN ol.product p " +
            "GROUP BY p.name ORDER BY totalSales DESC LIMIT 5")
	List<Object[]> findTopProducts();
}
