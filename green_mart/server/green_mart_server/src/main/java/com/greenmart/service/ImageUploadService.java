package com.greenmart.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageUploadService {
	@Autowired
	private final Cloudinary cloudinary;
	
	 public String uploadImage(MultipartFile image, String folder) {
	        try {
	            Map<?, ?> uploadResult = cloudinary.uploader().upload(image.getBytes(),
	                    ObjectUtils.asMap("folder", folder));
	            return uploadResult.get("secure_url").toString();
	        } catch (IOException e) {
	            throw new RuntimeException("Image upload failed", e);
	        }
	    }

}
