//package com.sunbeam.security;
//
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.sunbeam.dao.UserDao;
//import com.sunbeam.entities.UserEntity;
//
//import lombok.AllArgsConstructor;
//
//@Service
//@Transactional
//@AllArgsConstructor
//public class CustomUserDetailsServiceImpl implements UserDetailsService {
//	//depcy
//	private UserDao userDao;
//
//	@Override
//	public UserDetails loadUserByUsername(String email) throws 
//	UsernameNotFoundException {
//		User user=userDao.findByEmail(email)
//				.orElseThrow(() 
//						-> new UsernameNotFoundException("Invalid email !!!!!!"));
//		
//		return user;
//	}
//
//}



