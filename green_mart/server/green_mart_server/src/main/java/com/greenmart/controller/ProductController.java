package com.greenmart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.service.ProductService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
@Validated
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	

}
