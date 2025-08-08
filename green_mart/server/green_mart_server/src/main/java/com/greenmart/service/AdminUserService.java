package com.greenmart.service;

import java.util.List;

import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.UserResponseDTO;

public interface AdminUserService {
    List<UserResponseDTO> getAllActiveUsers();

	ApiResponse deleteCustomer(Long userId);

	ApiResponse restoreCustomer(Long userId);

	UserResponseDTO findUserById(Long userId);
    
    
}
