package com.greenmart.service;

import java.util.List;

import com.greenmart.dto.AddUserDTO;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.JWTResponseDTO;
import com.greenmart.dto.LoginDTO;
import com.greenmart.dto.UpdatePasswordDTO;
import com.greenmart.dto.UpdateUserDTO;
import com.greenmart.dto.UserResponseDTO;

public interface UserService {
	
	ApiResponse register(AddUserDTO dto);
	
	ApiResponse updateUser(Long userId,  UpdateUserDTO dto);
	
	ApiResponse deleteUser(Long userId);
	
	List<UserResponseDTO> getAllUsers();
	
	UserResponseDTO findUserById(Long userId);
	
	ApiResponse restoreUser(Long userId);
	
	ApiResponse updatePassword(Long userId, UpdatePasswordDTO dto);
	
	JWTResponseDTO login(LoginDTO dto);
}
