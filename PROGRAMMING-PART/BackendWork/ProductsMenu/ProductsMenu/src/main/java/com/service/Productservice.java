package com.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Model.Product;
import com.repository.ProductRepository;

@Service
public class Productservice {
	@Autowired
	private ProductRepository productRepository;
	String line ="";
	public void saveProductsData() {
		try {
			BufferedReader br = new BufferedReader(new FileReader("src/main/resources/Products.csv"));
			while((line = br.readLine())!=null) {
				String data[] = line.split(",");
				
				System.out.println(data[0]);
				Product p = new Product();
				p.setName(data[0]);
				p.setImageurl(data[1]);
				p.setPrice(Integer.parseInt(data[2]));
				p.setQty(Integer.parseInt(data[3]));
				p.setCategory(data[4]);
				System.out.println(data[4]);
				p.setRqty(1);
				
				Product p2 = productRepository.getByImageurl(p.getImageurl());
				if(p2 == null) {
					productRepository.save(p);
				}
				
			}
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println("error Occured"+e);
		}
	}
	
	public List<Product> getallProducts(){
		return productRepository.findAll();
	}
	
	public List<Product> getProductbyCategory(String cname){
		return productRepository.getproductsbyCategory(cname);
	}
	
	public List<Product> getProductbyName(String cname){
		return productRepository.getproductsbyName(cname);
	}
	
	public void updateQuantity(int pid,int qty) {
		Product p = productRepository.getById(pid);
		int remain = p.getQty()-qty;
		p.setQty(remain);
		productRepository.updateQty(remain, pid);
	}
	
	
	public List<Product> getProductsSortbyPrice(){
		return productRepository.pricesortedProducts();
	}
	
	public List<Product> getQtySortedProducts(){
		return productRepository.QtysortedProducts();
	}
	
	public void AdminupdateQuantity(int pid,int qty) {
		Product p = productRepository.getById(pid);
		int remain = p.getQty()+qty;
		p.setQty(remain);
		productRepository.updateQty(remain, pid);
	}
	
	public void DeleteProduct(int id) {
		Product p = productRepository.getById(id);
		productRepository.delete(p);
	}
	
	public void AdminupdatePrice(int pid,float price) throws Exception {
		Product p = productRepository.getById(pid);
		if(price!=0) {
			p.setPrice(price);
			productRepository.updateprice(price, pid);
		}else {
			throw new Exception("Price Cannot update to 0");
		}	
	}
	
	public void AdminupdateName(int pid,String name) throws Exception {
		Product p = productRepository.getById(pid);
		if(name!=null) {
			p.setName(name);
			productRepository.updatename(name, pid);
		}else {
			throw new Exception("Price Cannot update to null");
		}	
	}
	
	public Product saveProduct(Product p) {	
		return productRepository.save(p);
		
	}
	
	
	
	

}
