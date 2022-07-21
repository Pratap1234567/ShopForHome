package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class LoginRegisterClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginRegisterClientApplication.class, args);
		System.out.println("server running on port 8181");
	}

}
