package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProductsMenuApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductsMenuApplication.class, args);
		System.out.println("Product service running at 8282");
	}

}
