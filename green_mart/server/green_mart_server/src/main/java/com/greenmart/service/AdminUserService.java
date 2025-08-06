package com.greenmart.service;

import java.util.List;
import com.greenmart.dto.UserDTO;

public interface AdminUserService {
    List<UserDTO> getAllActiveUsers();
    String markUserAsUnavailable(Long userId);
}
