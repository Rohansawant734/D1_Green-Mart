package com.greenmart.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.greenmart.custom_exceptions.ApiException;
import com.greenmart.custom_exceptions.ResourceNotFoundException;
import com.greenmart.dao.CategoryDao;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.CategoryDTO;
import com.greenmart.dto.CategoryResponseDTO;
import com.greenmart.entities.Category;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private final ImageUploadService imageUploadService;
	@Autowired
	private final CategoryDao categoryDao;
	@Autowired
	private final ModelMapper modelMapper;
	@Autowired
	private final Cloudinary cloudinary;
	@Override
	public ApiResponse addNewCategory(CategoryDTO dto) {
		//duplicate check
		if(categoryDao.existsByCatName(dto.getCatName())) {
			throw new ApiException("Duplicate Category Name – addCategory failed");
		}
		//Map DTO -> Entity
		Category entity = modelMapper.map(dto, Category.class);
		
		//Handle image upload
		MultipartFile image = dto.getCatImage();
		if(image != null && !image.isEmpty()) {
			String url = imageUploadService.uploadImage(image, "category_images");
			entity.setCatImgUrl(url);
		}
		//persist
		
		Category saved = categoryDao.save(entity);
		
		return new ApiResponse("Added new category with Id = " + saved.getId());
	}
	
	@Override
	public List<CategoryResponseDTO> getAllCategories() {
		return categoryDao.findAll().stream()
				.map(cat ->{
					CategoryResponseDTO dto = new CategoryResponseDTO();
					dto.setId(cat.getId());
					dto.setCreationDate(cat.getCreationDate());
		            dto.setUpdatedOn(cat.getUpdatedOn());
		            dto.setCatName(cat.getCatName());
		            dto.setCatImage(cat.getCatImgUrl()); // Manually mapping image URL
		            dto.setBgColor(cat.getBgColor());
		            return dto;
				} )
				.toList();
	}
	
	@Override
	public ApiResponse updateCategory(Long id, CategoryDTO dto) {
		Category entity = categoryDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid category ID -- updated failed!"));
		//duplicate name
		if(categoryDao.existsByCatName(dto.getCatName()) && 
		!dto.getCatName().equals(entity.getCatName())){
			throw new ApiException("Duplicate category name - update failed");
		}
		//manual mapping
		if(dto.getCatName() != null) entity.setCatName(dto.getCatName());
		if(dto.getBgColor() != null) entity.setBgColor(dto.getBgColor());
		return new ApiResponse("Category details updated!");
	}
	
	@Override
	public ApiResponse deleteCategory(Long id) {
		Category category = categoryDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid category id"));
		categoryDao.delete(category);
		return new ApiResponse("deleted category details");
	}
}
