package com.greenmart.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import lombok.AllArgsConstructor;

@Configuration // to declare config class - equivalent to bean config xml file
@EnableWebSecurity // to enable spring security
@EnableMethodSecurity // later - to enable auth rules at method level
@AllArgsConstructor
public class SecurityConfiguration {
	private final PasswordEncoder passwordEncoder;
	// configure spring security filter chain - as a spring bean
	@Bean
	SecurityFilterChain configureFilterChain(HttpSecurity http) throws Exception {
		// HttpSecurity - spring sec supplied class
		// to customize n build filter chain
		// 1. disable CSRF protection
		http.csrf(csrf -> csrf.disable());
		// 2. any request - has to be authenticated
		http.authorizeHttpRequests(

				request -> request
				.requestMatchers("/swagger-ui/**",
						"/v3/api-docs/**", "/users/**")
						.permitAll()
				.requestMatchers(HttpMethod.GET, "/restaurants")
				.permitAll()
				.requestMatchers(HttpMethod.POST, "/restaurants")
				.hasRole("ADMIN")
				.anyRequest()
					.authenticated());
		// 3. disable HttpSession tracking - stateless
		http.sessionManagement(session -> 
		session.sessionCreationPolicy
		(SessionCreationPolicy.STATELESS));
		// 4. To support REST APIs , disable form login
		http.formLogin(form -> form.disable());
		// 5. Enable Basic auth support - with default.
		http.httpBasic(Customizer.withDefaults());
		return http.build();
	}

	
}
