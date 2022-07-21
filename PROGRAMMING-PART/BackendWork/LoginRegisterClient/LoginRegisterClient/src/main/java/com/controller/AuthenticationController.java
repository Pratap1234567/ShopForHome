package com.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.config.JwtUtil;
import com.model.AuthenticationRequest;
import com.model.AuthenticationResponse;
import com.model.Customer;
import com.repository.CustomerRepository;
import com.service.CustomerService;

@RestController
@CrossOrigin
public class AuthenticationController {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private CustomerService customerService;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private CustomerRepository customerRepository;
	
	@PostMapping(value = "authenticate")
	public ResponseEntity<?> createAuthenticateToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));

		} catch (DisabledException e) {
			// TODO: handle exception
			throw new Exception("User_disabled", e);
		} catch (BadCredentialsException e) {
			// TODO: handle exception
			throw new Exception("Invalid_Credentials", e);
		}
		
		UserDetails userDetails = customerService.loadUserByUsername(authenticationRequest.getUsername());
		Customer user = customerRepository.findByUsername(authenticationRequest.getUsername());
		String token = jwtUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(token,user));
	}

	@PostMapping(value="register",consumes = MediaType.APPLICATION_JSON_VALUE)
	public Customer RegisterCustomer(@RequestBody Customer customer) throws Exception {
		return customerService.registerCustomer(customer);
	}
	
	
	

}
