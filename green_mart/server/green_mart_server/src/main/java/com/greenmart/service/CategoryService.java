package com.greenmart.service;

import java.util.List;

import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.CategoryDTO;
import com.greenmart.dto.CategoryResponseDTO;

public interface CategoryService {

	ApiResponse addNewCategory(CategoryDTO dto);

	List<CategoryResponseDTO> getAllCategories();

	ApiResponse updateCategory(Long id, CategoryDTO dto);

	ApiResponse deleteCategory(Long id);

}
