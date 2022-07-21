package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SpringEmailSenderApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringEmailSenderApplication.class, args);
		System.out.println("SpringEmail running on port 8383");
	}

}
