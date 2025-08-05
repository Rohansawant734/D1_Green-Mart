package com.greenmart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.dto.CategoryDTO;
import com.greenmart.dto.CategoryResponseDTO;
import com.greenmart.service.CategoryService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	//add the categories
	@PostMapping(consumes = "multipart/form-data")
	@Operation(description = "Add new categories")
	public ResponseEntity<?> addCategory(@ModelAttribute CategoryDTO dto){
	System.out.println("in add " + dto);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(categoryService.addNewCategory(dto));
	}
	 
	//get all categories
	@GetMapping
	@Operation(summary = "Get all categories with images")
	public ResponseEntity<?> listAllCategories(){
		System.out.println("in list");
		List<CategoryResponseDTO> categories
		= categoryService.getAllCategories();
		if(categories.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(categories);
	}
	
	@PutMapping("/{id}")
	@Operation(summary = "update category")
	public ResponseEntity<?> updateCategory(@PathVariable Long id,@RequestBody CategoryDTO dto){
		return ResponseEntity.ok(categoryService.updateCategory(id,dto));
	}
	
	@DeleteMapping("/{id}")
	@Operation(summary = "delete category")
	public ResponseEntity<?> deleteCategory(@PathVariable Long id){
		return ResponseEntity.ok(categoryService.deleteCategory(id));
	}

}
