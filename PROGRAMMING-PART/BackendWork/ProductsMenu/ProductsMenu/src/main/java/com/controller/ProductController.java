package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Model.Product;
import com.service.Productservice;

@RestController
@CrossOrigin
public class ProductController {
	@Autowired
	private Productservice productservice;
	@GetMapping(path = "SaveProducts")
	public void setdatainDB() {
		productservice.saveProductsData();
	}
	@GetMapping(path = "getallProducts")
	public List<Product> getallProducts(){
		return productservice.getallProducts();
	}
	@GetMapping(value = "getProductbyCname/{cname}")
	public List<Product> getProductBycname(@PathVariable("cname") String cname){
		return productservice.getProductbyCategory(cname);
	}
	
	@GetMapping(value = "getProductbySearchname/{cname}")
	public List<Product> getProductByname(@PathVariable("cname") String cname){
		return productservice.getProductbyName(cname);
	}
	
	@PutMapping(value="UpdateQty/{pid}/{qty}")
	public void UpdateQty(@PathVariable("pid") int pid ,@PathVariable("qty") int qty) {
		productservice.updateQuantity(pid, qty);
	}
	
	@GetMapping(value="PriceSortedProducts")
	public List<Product> priceSortedProducts(){
		return this.productservice.getProductsSortbyPrice();
	}

}
