package com.greenmart.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryResponseDTO extends BaseDTO {
	private String catName;
    private String catImage;
    private String bgColor;
    
}
