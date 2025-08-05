package com.greenmart.RequestDto;

import java.util.List;

import com.greenmart.dto.ProductDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public class SupplierRequestDTO {
		 private String name;
		    private String contactNumber;
		    private String email;
		    private String address;
		    
		    private List<ProductDTO> products;
	}


