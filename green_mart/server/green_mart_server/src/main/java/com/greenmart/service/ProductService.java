package com.greenmart.service;

import java.util.List;

import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.ProductDTO;
import com.greenmart.dto.ProductResponseDTO;

public interface ProductService {

	ApiResponse addNewProduct(ProductDTO dto);

	List<ProductResponseDTO> getAllProducts();

	ApiResponse updateProduct(Long id, ProductDTO dto);

	ApiResponse deleteProduct(Long id);

	ProductResponseDTO	getProductById(Long id);
	
	List<ProductResponseDTO> searchProducts(String q);

}
