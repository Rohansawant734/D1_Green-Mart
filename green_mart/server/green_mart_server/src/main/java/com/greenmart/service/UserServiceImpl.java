package com.greenmart.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
	
	@Override
	public ApiResponse addNewUser(AddUserDTO dto) {
		User userEntity = modelMapper.map(dto, User.class);
		
		User persistentEntityUser =  uDao.save(userEntity);
		
		return new ApiResponse("Successfully added User with ID " + persistentEntityUser.getId());
	}

	@Override
	public ApiResponse updateUser(Long userId, UpdateUserDTO dto) {
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));
		modelMapper.map(dto, userEntity);
		
		User updateUser = uDao.save(userEntity);
		return new ApiResponse("Successfully updated User with ID " + updateUser.getId());
	}

	@Override
	public ApiResponse deleteUser(Long userId) {
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));
		
		userEntity.setDeleted(true);
		
		User deletedUser = uDao.save(userEntity);
		return new ApiResponse("Successfully updated User with ID " + deletedUser.getId());
	}

	@Override
	public List<UserResponseDTO> getAllUsers() {
		
		List<User> uList = uDao.findByisDeletedFalse();
		
		if(uList.isEmpty()) {
			throw new NoContentException("No Users added yet");
		}
		
		return uList.stream().map(user -> modelMapper.map(user, UserResponseDTO.class)).toList();
	}

	@Override
	public UserResponseDTO findUserById(Long userId) {
		
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));
		
		return modelMapper.map(userEntity, UserResponseDTO.class);
	}
	
	
}
