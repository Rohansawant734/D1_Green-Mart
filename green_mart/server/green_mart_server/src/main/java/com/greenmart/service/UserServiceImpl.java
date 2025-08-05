package com.greenmart.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.greenmart.custom_exceptions.ApiException;
import com.greenmart.custom_exceptions.NoContentException;
import com.greenmart.custom_exceptions.ResourceNotFoundException;
import com.greenmart.dao.UserDao;
import com.greenmart.dto.AddUserDTO;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.UpdateUserDTO;
import com.greenmart.dto.UserResponseDTO;
import com.greenmart.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserDao uDao;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public ApiResponse register(AddUserDTO dto) {
		// Check for duplicate email
		if (uDao.existsByEmail(dto.getEmail())) {
			throw new ApiException("Dup Email detected - User exists already!!!!");
		}
		
		// Map the add user dto to the user entity
		User userEntity = modelMapper.map(dto, User.class);
		
		// Encode the password before saving
	    userEntity.setPassword(passwordEncoder.encode(dto.getPassword()));
		
		// Saving the state of the user entity to be persistent from transient
		User persistentEntityUser =  uDao.save(userEntity);
		
		// Return the Api Response
		return new ApiResponse("Successfully added User with ID " + persistentEntityUser.getId());
	}

	@Override
	public ApiResponse updateUser(Long userId, UpdateUserDTO dto) {
		
		// Find the user by ID
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));
		
		// To prevent a deleted user from being updated
		if (userEntity.isDeleted()) {
		    throw new ApiException("Cannot modify a deleted user");
		}
		
		// Check for duplicate email
		if (!userEntity.getEmail().equals(dto.getEmail()) && uDao.existsByEmail(dto.getEmail())) {
			throw new ApiException("Dup Email detected - User exists already!!!!");
		}
		
		// Modifying the state of the persistent user entity
		modelMapper.map(dto, userEntity);
		
		// Saving modified state of the user entity
		User updateUser = uDao.save(userEntity);
		
		// Return the Api Response
		return new ApiResponse("Successfully updated User with ID " + updateUser.getId());
	}

	@Override
	public ApiResponse deleteUser(Long userId) {
		// Find the user by Id
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));
		
		// To prevent a user from being re-deleted
		if (userEntity.isDeleted()) {
		    throw new ApiException("Cannot modify a deleted user");
		}
		
		// Soft Deleting the user by setting the isDeleted to true
		userEntity.setDeleted(true);
		
		// Saving the modified state of the user entity
		User deletedUser = uDao.save(userEntity);
		
		// Return the Api Response
		return new ApiResponse("Successfully updated User with ID " + deletedUser.getId());
	}

	@Override
	public List<UserResponseDTO> getAllUsers() {
		
		// Collecting the list of users 
		List<User> uList = uDao.findByisDeletedFalse();
		
		// Check if the list is empty or not
		if(uList.isEmpty()) {
			throw new NoContentException("No Users added yet");
		}
		
		// Return the list in the form of DTO in the response
		return uList.stream().map(user -> modelMapper.map(user, UserResponseDTO.class)).toList();
	}

	@Override
	public UserResponseDTO findUserById(Long userId) {
		// Find the user by Id
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));
		
		if (userEntity.isDeleted()) {
		    throw new ResourceNotFoundException("User is deleted");
		}
		
		// Return the user as a DTO in the response
		return modelMapper.map(userEntity, UserResponseDTO.class);
	}

	@Override
	public ApiResponse restoreUser(Long userId) {
		// Find the user by ID
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		// Check if user is deleted or not
		if(!userEntity.isDeleted()) {
			throw new ApiException("User is not deleted");
		}
		
		// If deleted, restore the user
		userEntity.setDeleted(false);
		
		// Save the state of the persistent user
		User restoredEntity = uDao.save(userEntity);
		
		// Return the Api Response
		return new ApiResponse("Successfully restored user with Id " + restoredEntity.getId()) ;
	}
	
	
}
