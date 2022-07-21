package com.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class CartList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int productID;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProductID() {
		return productID;
	}
	public void setProductID(int productID) {
		this.productID = productID;
	}
	public CartList() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CartList( int productID) {
		super();
		
		this.productID = productID;
	}
	
	

}
