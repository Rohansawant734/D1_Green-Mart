package com.greenmart.service;

import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.greenmart.custom_exceptions.ApiException;
import com.greenmart.custom_exceptions.ResourceNotFoundException;
import com.greenmart.dao.CategoryDao;
import com.greenmart.dao.ProductDao;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.ProductDTO;
import com.greenmart.dto.ProductResponseDTO;
import com.greenmart.entities.Category;
import com.greenmart.entities.Product;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ImageUploadService imageUploadService;
	private final ProductDao productDao;
	private final CategoryDao categoryDao;
	private final ModelMapper modelMapper;
	
	@Override
	public ApiResponse addNewProduct(ProductDTO dto) {
			if(productDao.existsByProdName(dto.getProdName()))
				throw new ApiException("Dup product Name - add Product failed");
			Product entity = modelMapper.map(dto, Product.class);
			
			Category category = categoryDao.findById(dto.getCategoryId())
					.orElseThrow(()-> new RuntimeException("Category not found"));
			entity.setMyCategory(category);
			
			//handle image
			MultipartFile image = dto.getImage();
			if(image != null && !image.isEmpty()) {
				String imageUrl = imageUploadService.uploadImage(image,"product_images");
				entity.setProdImgUrl(imageUrl);
			}
			Product persistentProduct = productDao.save(entity);
		return new ApiResponse
				("Added new product with Id = "+persistentProduct.getId());
	}
	
	@Override
	public List<ProductResponseDTO> getAllProducts() {
		return productDao.findAll().stream()
				.map(pro -> {
				ProductResponseDTO dto = new ProductResponseDTO();
				dto.setId(pro.getId());
				dto.setCreationDate(pro.getCreationDate());
	            dto.setUpdatedOn(pro.getUpdatedOn());
	            dto.setProdName(pro.getProdName());
	            dto.setPrice(pro.getPrice());
	            dto.setDescription(pro.getDescription());
	            dto.setProimage(pro.getProdImgUrl());
	            dto.setUnit(pro.getUnit());
	            dto.setInStock(pro.isInStock());
	            if (pro.getMyCategory() != null) {
	                dto.setCategoryId(pro.getMyCategory().getId());
	            }
	            return dto;
				}).toList();
	}
	
	@Override
	public ProductResponseDTO updateProduct(ProductDTO dto) {
		Product existingProduct = productDao.findById(dto.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Product not found"));
		 // 2. Update fields only if they are provided (non-null or non-empty)
	    if (dto.getProdName() != null && !dto.getProdName().isBlank()) {
	        existingProduct.setProdName(dto.getProdName());
	    }

	    if (dto.getDescription() != null && !dto.getDescription().isBlank()) {
	        existingProduct.setDescription(dto.getDescription());
	    }

	    if (dto.getPrice() != null) {
	        existingProduct.setPrice(dto.getPrice());
	    }

	    if (dto.getUnit() != null && !dto.getUnit().isBlank()) {
	        existingProduct.setUnit(dto.getUnit());
	    }

	    if (dto.getInStock() != null) {
	        existingProduct.setInStock(dto.getInStock());
	    }

	    // 3. Image: Upload only if new file is sent
	    if (dto.getImage() != null && !dto.getImage().isEmpty()) {
	        String imageUrl = imageUploadService.uploadImage(dto.getImage(), imageUrl);
	        existingProduct.setProdImgUrl(imageUrl);
	    }

	    // 4. Category: update only if new categoryId is sent
	    if (dto.getCategoryId() != null) {
	        Category category = categoryDao.findById(dto.getCategoryId())
	                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
	        existingProduct.setMyCategory(category);
	    }
	    
	    Product updated = productDao.save(existingProduct);
	    
	    ProductResponseDTO responseDTO = new ProductResponseDTO();
	    responseDTO.setId(updated.getId());
	    responseDTO.setProdName(updated.getProdName());
	    responseDTO.setDescription(updated.getDescription());
	    responseDTO.setPrice(updated.getPrice());
	    responseDTO.setUnit(updated.getUnit());
	    responseDTO.setInStock(updated.isInStock());
	    responseDTO.setProimage(updated.getProdImgUrl());
	    responseDTO.setCategoryId(updated.getMyCategory().getId());
	    responseDTO.setCreationDate(updated.getCreationDate());
	    responseDTO.setUpdatedOn(updated.getUpdatedOn());

	    return responseDTO;
	}
	

}
