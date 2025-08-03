package com.greenmart.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.greenmart.dao.AddressDao;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AddressServiceImpl implements AddressService{
	private final AddressDao aDao;
	private final ModelMapper modelMapper;
	
	
}
