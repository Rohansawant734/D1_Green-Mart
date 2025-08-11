package com.greenmart.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.greenmart.custom_exceptions.ApiException;
import com.greenmart.custom_exceptions.NoContentException;
import com.greenmart.custom_exceptions.ResourceNotFoundException;
import com.greenmart.dao.AdminDao;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.UserResponseDTO;
import com.greenmart.entities.User;
import com.greenmart.entities.UserRole;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@AllArgsConstructor 
public class AdminUserServiceImpl implements AdminUserService {
	
	private final AdminDao adminDao;
	private final ModelMapper modelMapper;

    @Override
    public List<UserResponseDTO> getAllActiveUsers() {
    	log.info("Getting all the non-deleted customers");
        List<User> uList = adminDao.findByUserRole(UserRole.CUSTOMER);
        
        if(uList.isEmpty()) {
        	log.warn("No customers found");
        	throw new NoContentException("There are no customers registered yet");
        }
       
        return uList.stream().map(user -> {
        	UserResponseDTO dto = modelMapper.map(user, UserResponseDTO.class);
        	dto.setUserId(user.getId());
        	return dto;
        	}).toList();
    }

	@Override
	public ApiResponse deleteCustomer(Long userId) {
		log.info("Deleting customer with ID: {}", userId);
		// Find the user by Id
		User userEntity = adminDao.findByIdAndUserRole(userId, UserRole.CUSTOMER).orElseThrow(() -> new ResourceNotFoundException("Invalid Customer ID"));
		
		// To prevent a user from being re-deleted
		if (userEntity.isDeleted()) {
			log.warn("Attempted to delete already deleted customer with ID: {}", userId);
		    throw new ApiException("Cannot delete a inactive customer");
		}
		
		// Soft Deleting the customer by setting the isDeleted to true
		userEntity.setDeleted(true);
		
		// Saving the modified state of the Customer entity
		User deletedCustomer = adminDao.save(userEntity);
		
		log.info("Customer soft-deleted successfully with ID: {}", deletedCustomer.getId());
		// Return the Api Response
		return new ApiResponse("Successfully updated Customer with ID " + deletedCustomer.getId());
	}
	
	@Override
	public ApiResponse restoreCustomer(Long userId) {
		log.info("Restoring customer with ID: {}", userId);
		// Find the user by Id
		User userEntity = adminDao.findByIdAndUserRole(userId, UserRole.CUSTOMER).orElseThrow(() -> new ResourceNotFoundException("Invalid Customer ID"));
		
		// To prevent a user from being re-deleted
		if (!userEntity.isDeleted()) {
			log.warn("Attempted to restore already restored customer with ID: {}", userId);
			throw new ApiException("Cannot restore a active customer");
		}
		
		// Soft Deleting the customer by setting the isDeleted to true
		userEntity.setDeleted(false);
		
		// Saving the modified state of the Customer entity
		User restoredCustomer = adminDao.save(userEntity);
		
		log.info("Customer soft-deleted successfully with ID: {}", restoredCustomer.getId());
		// Return the Api Response
		return new ApiResponse("Successfully updated Customer with ID " + restoredCustomer.getId());
	}
	
	@Override
	public UserResponseDTO findUserById(Long userId) {
		log.info("Fetching customer by ID: {}", userId);
		// Find the user by Id
		User userEntity = adminDao.findByIdAndUserRole(userId, UserRole.CUSTOMER).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));
		
		if (userEntity.isDeleted()) {
			log.warn("Customer with ID {} is deleted", userId);
		    throw new ResourceNotFoundException("User is deleted");
		}
		
		log.info("Customer found: {}", userEntity.getEmail());
		
		UserResponseDTO dto = modelMapper.map(userEntity, UserResponseDTO.class);
		dto.setUserId(userEntity.getId());
		// Return the user as a DTO in the response
		return dto;
	}
}
