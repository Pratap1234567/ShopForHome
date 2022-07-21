package com.model;

public class AuthenticationResponse {

	private String token;
	private Customer user;
	
	public AuthenticationResponse()
	{
		
	}

	public AuthenticationResponse(String token,Customer user) {
		super();
		this.token = token;
		this.user=user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Customer getUser() {
		return user;
	}

	public void setUser(Customer user) {
		this.user = user;
	}
	
	
	
}
