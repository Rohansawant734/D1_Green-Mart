package com.greenmart.service;

import java.util.List;

import com.greenmart.dto.AddUserDTO;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.UpdateUserDTO;
import com.greenmart.dto.UserResponseDTO;

public interface UserService {
	
	ApiResponse addNewUser(AddUserDTO dto);
	
	ApiResponse updateUser(Long userId,  UpdateUserDTO dto);
	
	ApiResponse deleteUser(Long userId);
	
	List<UserResponseDTO> getAllUsers();
	
	UserResponseDTO findUserById(Long userId);
}
