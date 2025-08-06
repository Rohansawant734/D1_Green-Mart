package com.greenmart.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenmart.dao.UserRepository;
import com.greenmart.dto.UserDTO;
import com.greenmart.entities.User;
@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserDTO> getAllActiveUsers() {
        List<User> users = userRepository.findByIsDeletedFalse();
        return users.stream()
                .map(user -> new UserDTO(
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getCreationDate(),
                        user.getUpdatedOn()))
                .collect(Collectors.toList());
    }

    @Override
    public String markUserAsUnavailable(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setDeleted(true);
        userRepository.save(user);
        return "User marked as unavailable";
    }
}
