package com.greenmart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.greenmart.dto.ProductDTO;
import com.greenmart.dto.ProductResponseDTO;
import com.greenmart.entities.Product;
import com.greenmart.service.ProductService;
import com.greenmart.service.ProductServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
@Validated
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping(consumes = "multipart/form-data")
	@Operation(description = "Add new product")
	public ResponseEntity<?> addProduct(@ModelAttribute ProductDTO dto){
		System.out.println("in add " + dto);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(productService.addNewProduct(dto));
	}
	
	@GetMapping
	@Operation(description = "list all products")
	public ResponseEntity<?> getAllProducts(){
		System.out.println("in list");
		List<ProductResponseDTO>products=
		productService.getAllProducts();
		if(products.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(products);
	}
	
	@PutMapping(value = "/{id}",consumes = "multipart/form-data")
	@Operation(description = "Update existing product by ID")
	public ResponseEntity<?> updateProduct(@PathVariable Long id, @ModelAttribute ProductDTO dto ){
		dto.setId(id);//Ensure ID is set
		
		ProductResponseDTO updatedProduct = productService.updateProduct(dto);
		return ResponseEntity.ok(updatedProduct);
	}
	

}
