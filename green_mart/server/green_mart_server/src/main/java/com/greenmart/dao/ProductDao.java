package com.greenmart.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.greenmart.entities.Product;

public interface ProductDao extends JpaRepository<Product, Long> {
	boolean existsByProdName(String prodName);
	
	@Query("SELECT p.myCategory.catName,COUNT(p) FROM Product p GROUP BY p.myCategory.catName")
	List<Object[]> countProductGroupByList();

	@Query(value = """
		    SELECT p.product_name, SUM(ol.quantity) AS totalSales
		    FROM order_lines ol
		    JOIN products p ON ol.product_id = p.id
		    GROUP BY p.product_name
		    ORDER BY totalSales DESC
		    LIMIT 5
		    """, nativeQuery = true)
		List<Object[]> findTopProducts();



  
  @Query(value = "SELECT p.* FROM products p " +
	        "JOIN categories c ON p.category_id = c.id " +
	        "WHERE LOWER(p.product_name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	        "OR LOWER(c.category_name) LIKE LOWER(CONCAT('%', :keyword, '%'))",
	       nativeQuery = true)
	List<Product> searchByNameOrCategoryNative(@Param("keyword") String keyword);

}
