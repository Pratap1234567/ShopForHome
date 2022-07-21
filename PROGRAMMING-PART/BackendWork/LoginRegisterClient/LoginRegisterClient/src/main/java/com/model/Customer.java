package com.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String username;
	private String email;
	private String password;
	private String role;
	private String phone;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="Address_ID")
	private Address DeliveryAddress;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "customer_id")
	private List<WishList> customerWishlist;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "customer_id")
	private List<CartList> customerCartList;

	public Customer(int id, String username, String email, String password, String role, String phone) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.phone = phone;
		this.customerWishlist = new ArrayList<WishList>();
		this.customerCartList = new ArrayList<CartList>();

	}

	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<WishList> getCustomerWishlist() {
		return customerWishlist;
	}

	public void setCustomerWishlist(List<WishList> customerWishlist) {
		this.customerWishlist = customerWishlist;
	}

	public List<CartList> getCustomerCartList() {
		return customerCartList;
	}

	public void setCustomerCartList(List<CartList> customerCartList) {
		this.customerCartList = customerCartList;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	

	

	public Address getDeliveryAddress() {
		return DeliveryAddress;
	}

	public void setDeliveryAddress(Address deliveryAddress) {
		DeliveryAddress = deliveryAddress;
	}

	// this method is to add wishitem to wishlist of Customer
	public void addtoWishList(WishList wishitem) {
		if (this.customerWishlist == null) {
			this.customerWishlist = new ArrayList<WishList>();
		}
		this.customerWishlist.add(wishitem);
	}

//	this method is to add items to cart of customer;
	public void addtocart(CartList cartitem) {
		if (this.customerCartList == null) {
			this.customerCartList = new ArrayList<CartList>();
		}
		this.customerCartList.add(cartitem);
	}
}
