package com.greenmart.security;

import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.greenmart.dao.UserDao;
import com.greenmart.entities.User;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	//depcy
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws 
	UsernameNotFoundException {
		User user=userDao.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Invalid email !!!!!!"));
		
		if(!user.isEnabled()) {
			throw new DisabledException("Your account is disabled. Please contact support");
		}
		
		
		return user;
	}

}
