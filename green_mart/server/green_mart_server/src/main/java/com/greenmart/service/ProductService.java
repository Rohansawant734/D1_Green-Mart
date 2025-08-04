package com.greenmart.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.ProductDTO;
import com.greenmart.dto.ProductResponseDTO;

public interface ProductService {

	ApiResponse addNewProduct(ProductDTO dto);

	List<ProductResponseDTO> getAllProducts();

	ProductResponseDTO updateProduct(ProductDTO dto);

}
