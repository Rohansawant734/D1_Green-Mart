package com.greenmart.service;

import java.util.List;

import com.greenmart.dto.AddAddressDTO;
import com.greenmart.dto.AddressDTO;
import com.greenmart.dto.ApiResponse;

public interface AddressService {
	 ApiResponse addAddressToUser(Long userId, AddAddressDTO dto);
	 
	 List<AddressDTO> getAllAddressesForUser(Long userId);
	 
	 AddressDTO findAddressById(Long userId, Long addrId);
	 
	 ApiResponse updateAddress(Long userId, Long addrId, AddAddressDTO dto);
	 
	 ApiResponse deleteAddress(Long userId, Long addrId);
	 
	 
}
