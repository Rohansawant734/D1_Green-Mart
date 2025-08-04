package com.greenmart.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.greenmart.custom_exceptions.NoContentException;
import com.greenmart.custom_exceptions.ResourceNotFoundException;
import com.greenmart.dao.AddressDao;
import com.greenmart.dao.UserDao;
import com.greenmart.dto.AddAddressDTO;
import com.greenmart.dto.AddressDTO;
import com.greenmart.dto.ApiResponse;
import com.greenmart.entities.Address;
import com.greenmart.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AddressServiceImpl implements AddressService{
	private final AddressDao aDao;
	private final UserDao uDao;
	private final ModelMapper modelMapper;
	
	
	@Override
	public ApiResponse addAddressToUser(Long userId, AddAddressDTO dto) {
		
		// 1. Get user from their id
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id - Address cannot be added"));
		
		// 2. Map Address DTO to Entity
		Address addressEntity = modelMapper.map(dto, Address.class);
		
		// 3. Add address for the particular user
		userEntity.addAddress(addressEntity);
		
		uDao.save(userEntity); // Saves user with new address
 		return new ApiResponse("New address added to user");
	}


	@Override
	public List<AddressDTO> getAllAddressesForUser(Long userId) {
		// Checking if user is valid or not
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		// Collect list of address which are not deleted
		List<Address> aList =  aDao.findByUserIdAndIsDeletedFalse(userId);
		
		// Check if list is empty or not
		if(aList.isEmpty()) {
			throw new NoContentException("No Addresses added yet");
		}
		
		// Return the list in the form of DTO
		return aList.stream().map(address -> modelMapper.map(address, AddressDTO.class)).toList();
	}


	@Override
	public AddressDTO findAddressById(Long userId, Long addrId) {
		// Checking if user is valid or not
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		// Find the address for the particular user
		Address addressEntity = aDao.findByUserIdAndIdAndIsDeletedFalse(userId, addrId).orElseThrow(() -> new ResourceNotFoundException("Address not found or it does not exist"));
		
		// Return it in the form of DTO
		return modelMapper.map(addressEntity, AddressDTO.class);
	}


	@Override
	public ApiResponse updateAddress(Long userId, Long addrId, AddAddressDTO dto) {
		// Checking if user is valid or not
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
		
		// Find the address
		Address addressEntity = aDao.findByUserIdAndIdAndIsDeletedFalse(userId, addrId).orElseThrow(() -> new ResourceNotFoundException("Address not found or it does not exist"));
		
		modelMapper.map(dto, addressEntity); // Modifying the state of the persistent address entity
		
		// Saved updated entity
		aDao.save(addressEntity);
		return new ApiResponse("Address updated");
	}


	@Override
	public ApiResponse deleteAddress(Long userId, Long addrId) {
		// Checking if user is valid or not
		User userEntity = uDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid user Id"));
				
		// Find the address
		Address addressEntity = aDao.findByUserIdAndIdAndIsDeletedFalse(userId, addrId).orElseThrow(() -> new ResourceNotFoundException("Address not found or it does not exist"));
		
		addressEntity.setDeleted(true); // Address is soft-deleted
		
		// Save the isDeleted change
		aDao.save(addressEntity);
		
		return new ApiResponse("Address deleted successfully") ;
	}

	
}
