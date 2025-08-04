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
	            dto.setOfferPrice(pro.getOfferPrice());
	            if (pro.getMyCategory() != null) {
	                dto.setCategoryId(pro.getMyCategory().getId());
	            }
	            return dto;
				}).toList();
	}
	
	
	@Override
	public ApiResponse updateProduct(Long id, ProductDTO dto) {
		 Product entity = productDao.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("Invalid Product ID: update failed"));

	        // Duplicate name check
	        if (productDao.existsByProdName(dto.getProdName()) && 
	            !dto.getProdName().equals(entity.getProdName())) {
	            throw new ApiException("Duplicate product name - update failed");
	        }

	        // Manual mapping
	        if (dto.getProdName() != null) entity.setProdName(dto.getProdName());
	        if (dto.getDescription() != null) entity.setDescription(dto.getDescription());
	        if (dto.getPrice() != null) entity.setPrice(dto.getPrice());
	        if (dto.getUnit() != null) entity.setUnit(dto.getUnit());
	        if (dto.getInStock() != null) entity.setInStock(dto.getInStock());
	        if(dto.getOfferPrice() != 0) entity.setOfferPrice(dto.getOfferPrice());

	        // Set category
	        if (dto.getCategoryId() != null) {
	            Category category = categoryDao.findById(dto.getCategoryId())
	                    .orElseThrow(() -> new ResourceNotFoundException("Invalid Category ID"));
	            entity.setMyCategory(category);
	        }

	        // Image upload
	        MultipartFile imageFile = dto.getImage();
	        if (imageFile != null && !imageFile.isEmpty()) {
	            String imageUrl = imageUploadService.uploadImage(imageFile, "products");
	            entity.setProdImgUrl(imageUrl);
	        }

	        return new ApiResponse("Product details updated!");
	}
	
	@Override
	public ApiResponse deleteProduct(Long id) {
		Product product = productDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("invalid product id"));
		product.setInStock(false);
		return new ApiResponse("Soft deleted product details");
	}
	

}
