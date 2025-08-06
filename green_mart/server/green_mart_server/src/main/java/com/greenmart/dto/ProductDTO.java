package com.greenmart.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO extends BaseDTO {
	private String prodName;
    private String description;
    private Double price;
    private String unit;
    private Boolean inStock;
    private int offerPrice;
    private Long categoryId;
    private String supplierEmail;
    private MultipartFile image;
}
