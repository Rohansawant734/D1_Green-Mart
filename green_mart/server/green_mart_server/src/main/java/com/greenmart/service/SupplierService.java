package com.greenmart.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenmart.entities.Supplier;
import com.greenmart.dao.SupplierDao;
import com.greenmart.RequestDto.SupplierRequestDTO;
import com.greenmart.ResponseDto.SupplierResponseDTO;

@Service
public class SupplierService {
	 @Autowired
	    private SupplierDao supplierDao;

	    public SupplierResponseDTO addSupplier(Supplier supplier) {
	    	
	    	Supplier savedSupplier = supplierDao.save(supplier);
	    	SupplierResponseDTO responseDTO = new SupplierResponseDTO(
	                savedSupplier.getName(),
	                savedSupplier.getContactNumber(),
	                savedSupplier.getEmail(),
	                savedSupplier.getAddress()
	        );
	    	return responseDTO;

}

	    public List<SupplierResponseDTO> getAllSuppliers() {
	        List<Supplier> suppliers = supplierDao.findAll();
	        List<SupplierResponseDTO> dtos = new ArrayList<>();

	        for (Supplier supplier : suppliers) {
	        	SupplierResponseDTO dto = new SupplierResponseDTO();
	            dto.setName(supplier.getName());
	            dto.setContactNumber(supplier.getContactNumber());
	            dto.setEmail(supplier.getEmail());
	            dto.setAddress(supplier.getAddress());
	            dtos.add(dto);
	        }

	        return dtos;
	    }
	    
	    public void deleteSupplierById(Long id) {
	        if (!supplierDao.existsById(id)) {
	            throw new RuntimeException("Supplier not found");
	        }
	        supplierDao.deleteById(id);
	    }
	    
	    
	    public SupplierResponseDTO updateSupplier(Long id, SupplierRequestDTO dto) {
	    	  Supplier existingSupplier = supplierDao.findById(id).orElse(null);

		        if (existingSupplier == null) {
		            return null; // Not found
		        }
		        existingSupplier.setName(dto.getName());
		        existingSupplier.setEmail(dto.getEmail());
		        existingSupplier.setContactNumber(dto.getContactNumber());
		        existingSupplier.setAddress(dto.getAddress());
		        
	        Supplier updatedSupplier = supplierDao.save( existingSupplier);

	        SupplierResponseDTO responseDTO = new SupplierResponseDTO(
	        		updatedSupplier.getName(),
	        		updatedSupplier.getContactNumber(),
	        		updatedSupplier.getEmail(),
	        		updatedSupplier.getAddress()
	        );
	    	return responseDTO;
	    }


}

		

