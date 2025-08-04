package com.greenmart.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class ImageUploadService {
	@Autowired
	private Cloudinary cloudinary;
	
	public String uploadImage(MultipartFile file) throws IOException{
		Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder","product_images"));
		
		return uploadResult.get("secure_url").toString();// return Cloudinary image URL
	}

}
