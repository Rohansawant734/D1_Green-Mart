package com.greenmart.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.greenmart.custom_exceptions.ApiException;
import com.greenmart.custom_exceptions.NoContentException;
import com.greenmart.custom_exceptions.ResourceNotFoundException;
import com.greenmart.dao.UserDao;
import com.greenmart.dto.AddUserDTO;
import com.greenmart.dto.ApiResponse;
import com.greenmart.dto.JWTResponseDTO;
import com.greenmart.dto.LoginDTO;
import com.greenmart.dto.UpdatePasswordDTO;
import com.greenmart.dto.UpdateUserDTO;
import com.greenmart.dto.UserResponseDTO;
import com.greenmart.entities.User;
import com.greenmart.entities.UserRole;
import com.greenmart.security.JwtUtils;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserDao uDao;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final EmailService emailService;
	
	@Override
	public ApiResponse register(AddUserDTO dto) {
		log.info("Attempting to register new user with email: {}", dto.getEmail());
		
		// Check for duplicate email
		if (uDao.existsByEmail(dto.getEmail())) {
			throw new ApiException("Duplicate Email detected - user exists already!!!!");
		}
		
		// Map the add user dto to the user entity
		User userEntity = modelMapper.map(dto, User.class);
		
		// Sets the role of the user to customer by default
		userEntity.setUserRole(UserRole.CUSTOMER);
		
		// Encode the password before saving
	    userEntity.setPassword(passwordEncoder.encode(dto.getPassword()));
		
		// Saving the state of the user entity to be persistent from transient
		User persistentEntityUser =  uDao.save(userEntity);
		
		emailService.sendWelcomeEmail(dto.getEmail(), dto.getFirstName());
		
		log.info("User registered successfully with ID: {}", persistentEntityUser.getId());
		// Return the Api Response
		return new ApiResponse("Successfully added User with ID " + persistentEntityUser.getId());
	}

	@Override
	public ApiResponse updateUser(Long userId, UpdateUserDTO dto) {
		log.info("Updating password for user ID: {}", userId);
		// Find the user by ID
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));
		
		// To prevent a deleted user from being updated
		if (userEntity.isDeleted()) {
			log.warn("Attempted to update deleted user with ID: {}", userId);
		    throw new ApiException("Cannot modify a deleted user");
		}
		
		// Check for duplicate email
		if (!userEntity.getEmail().equals(dto.getEmail()) && uDao.existsByEmail(dto.getEmail())) {
			log.warn("Update failed: Duplicate email {}", dto.getEmail());
			throw new ApiException("Duplicate Email detected - user exists already!!!!");
		}
		
		// Modifying the state of the persistent user entity
		modelMapper.map(dto, userEntity);
		
		// Saving modified state of the user entity
		User updatedUser = uDao.save(userEntity);
		
		log.info("User updated successfully with ID: {}", updatedUser.getId());
		// any other fields like token if required
		return new ApiResponse("Successfully updated user with Id: " + updatedUser.getId()) ;
	}

	@Override
	public ApiResponse deleteUser(Long userId) {
		log.info("Deleting user with ID: {}", userId);
		// Find the user by Id
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));
		
		// To prevent a user from being re-deleted
		if (userEntity.isDeleted()) {
			log.warn("Attempted to delete already deleted user with ID: {}", userId);
		    throw new ApiException("Cannot modify a deleted user");
		}
		
		// Soft Deleting the user by setting the isDeleted to true
		userEntity.setDeleted(true);
		
		// Saving the modified state of the user entity
		User deletedUser = uDao.save(userEntity);
		
		log.info("User soft-deleted successfully with ID: {}", deletedUser.getId());
		// Return the Api Response
		return new ApiResponse("Successfully updated User with ID " + deletedUser.getId());
	}

	@Override
	public List<UserResponseDTO> getAllUsers() {
		log.info("Fetching all non-deleted users");
		// Collecting the list of users 
		List<User> uList = uDao.findByisDeletedFalse();
		
		// Check if the list is empty or not
		if(uList.isEmpty()) {
			log.warn("No users found");
			throw new NoContentException("No Users added yet");
		}
		
		log.info("Fetched {} users", uList.size());
		// Return the list in the form of DTO in the response
		return uList.stream().map(user -> modelMapper.map(user, UserResponseDTO.class)).toList();
	}

	@Override
	public UserResponseDTO findUserById(Long userId) {
		log.info("Fetching user by ID: {}", userId);
		// Find the user by Id
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));
		
		if (userEntity.isDeleted()) {
			log.warn("User with ID {} is deleted", userId);
		    throw new ResourceNotFoundException("User is deleted");
		}
		
		log.info("User found: {}", userEntity.getEmail());
		
		UserResponseDTO dto = modelMapper.map(userEntity, UserResponseDTO.class);
		dto.setUserId(userEntity.getId());
		// Return the user as a DTO in the response
		return dto;
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

	@Override
	public ApiResponse updatePassword(Long userId, UpdatePasswordDTO dto) {
		log.info("Updating password for user ID: {}", userId);
		// Find the user by ID
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		// Check if user is deleted or not
		if (userEntity.isDeleted()) {
			log.warn("Attempt to update password for deleted user ID: {}", userId);
		    throw new ApiException("Cannot update password for deleted user");
		}
		
		// Check if the Old password entered matches with the password store in the database
		if(!passwordEncoder.matches(dto.getOldPassword(), userEntity.getPassword())) {
			log.warn("Old password mismatch for user ID: {}", userId);
			throw new ApiException("Old password does not match");
		}
		
		// Check if new password is same as old password
		if (passwordEncoder.matches(dto.getNewPassword(), userEntity.getPassword())) {
			log.warn("New password is same as old password for user ID: {}", userId);
		    throw new ApiException("New password cannot be same as old password");
		}
		
		// Update the password and encode it
		userEntity.setPassword(passwordEncoder.encode(dto.getNewPassword()));
		
		// Save the update state of the persistent entity
		uDao.save(userEntity);
		
		emailService.sendPasswordUpdateEmail(userEntity.getEmail(), userEntity.getFirstName());
		
		log.info("Password updated successfully for user ID: {}", userId);
		// Return the Api Response
		return new ApiResponse("Password Updated Successfully");
	}

	@Override
	public JWTResponseDTO login(LoginDTO dto) {
		try {
		// User authenticated using authentication manager
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
		
		// Generate JWT token
		String token = jwtUtils.generateJwtToken(authentication);
		
		// Get the user details
		User userEntity = uDao.findByEmail(dto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		// Check if user is deleted or not
		if (userEntity.isDeleted()) {
			log.warn("Login attempt for deleted user: {}", dto.getEmail());
		    throw new ApiException("User account is deleted");
		}
		
		log.info("User {} logged in successfully", userEntity.getEmail());
		
		// Manually map the response dto with the entity
		JWTResponseDTO jwtResponse = new JWTResponseDTO();
		jwtResponse.setToken(token);
		jwtResponse.setFirstName(userEntity.getFirstName());
		jwtResponse.setLastName(userEntity.getLastName());
		jwtResponse.setEmail(userEntity.getEmail());
		jwtResponse.setPhone(userEntity.getPhone());
		jwtResponse.setUserId(userEntity.getId());
		jwtResponse.setUserRole(userEntity.getUserRole().name());
		// Return jwtResponse
		return jwtResponse;
		}
		catch (DisabledException e) {
			log.warn("Disabled account: {}", dto.getEmail());
			throw new ApiException("Your account is disabled. Please contact support.");
		}
		catch (LockedException e) {
			log.warn("Locked account: {}", dto.getEmail());
			throw new ApiException("Your account is Locked. Please contact support.");
		}
		catch (BadCredentialsException e) {
			log.warn("Invalid credentials for account: {}", dto.getEmail());
			throw new ApiException("Invalid email or password.");
		}
	}

}
