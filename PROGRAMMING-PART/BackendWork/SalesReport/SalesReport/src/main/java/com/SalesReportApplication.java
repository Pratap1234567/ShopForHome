package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;



@SpringBootApplication
@EnableEurekaClient

public class SalesReportApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalesReportApplication.class, args);
		System.out.println("Running on 8484");
	}

}
