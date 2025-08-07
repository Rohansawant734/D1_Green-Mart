package com.greenmart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenmart.dto.AddAddressDTO;
import com.greenmart.dto.AddressDTO;
import com.greenmart.service.AddressService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/address")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@Validated
public class AddressController {

	private final AddressService addressService;

	@GetMapping("/{userId}")
	public ResponseEntity<?> listAllAddresses(@PathVariable Long userId) {
		List<AddressDTO> aList = addressService.getAllAddressesForUser(userId);
		return ResponseEntity.ok(aList);
	}

	@GetMapping("/{userId}/{addrId}")
	public ResponseEntity<?> getAddress(@PathVariable Long userId, @PathVariable Long addrId) {

		return ResponseEntity.ok(addressService.findAddressById(userId, addrId));
	}

	@PostMapping("/{userId}")
	public ResponseEntity<?> addAddress(@PathVariable Long userId, @RequestBody @Valid AddAddressDTO dto) {

		return ResponseEntity.status(HttpStatus.CREATED).body(addressService.addAddressToUser(userId, dto));
	}

	@PutMapping("/{userId}/{addrId}")
	@Operation(description = "Update address details(Partial or Complete)")
	public ResponseEntity<?> updateAddress(@PathVariable Long userId, @PathVariable Long addrId,
			@RequestBody @Valid AddAddressDTO dto) {

		return ResponseEntity.ok(addressService.updateAddress(userId, addrId, dto));
	}

	@DeleteMapping("/{userId}/{addrId}")
	@Operation(description = " delete address")
	public ResponseEntity<?> deleteAddress(@PathVariable Long userId, @PathVariable Long addrId) {

		return ResponseEntity.ok(addressService.deleteAddress(userId, addrId));
	}

	 
}
