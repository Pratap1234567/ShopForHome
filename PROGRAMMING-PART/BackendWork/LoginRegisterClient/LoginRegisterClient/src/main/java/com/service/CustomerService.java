package com.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.model.Address;
import com.model.CartList;
import com.model.Customer;
import com.model.WishList;
import com.repository.CustomerRepository;

@Service
public class CustomerService implements UserDetailsService {
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;

//	this method to Register the customer for Application
	public Customer registerCustomer(Customer customer) throws Exception {
		Customer c1= customerRepository.findByEmail(customer.getEmail());
		Customer c2 = customerRepository.findByUsername(customer.getUsername());
		if(c1!=null && c2!=null) {
			throw new Exception("User already Exist with "+customer.getEmail());
		}else {
			customer.setPassword(bcryptEncoder.encode(customer.getPassword()));
			return customerRepository.save(customer);
		}
	
	}
	public Customer getuserbyUsername(String username) {
		return customerRepository.findByUsername(username);
	}
	
	public Customer getUserbyId(int id) {
		return  customerRepository.getById(id);
	}

//	this is method is for Customer Login 
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		List<SimpleGrantedAuthority> roles = null;
		Customer c = customerRepository.findByUsername(username);
		if (c != null) {
			roles = Arrays.asList(new SimpleGrantedAuthority(c.getRole()));
			return new User(c.getUsername(),c.getPassword(), roles);
		}
		throw new UsernameNotFoundException("User not Found With Username " + username);
	}
	
//	this is used to retrive all the existing Customers

	public List<Customer> getallCustomers() {
		return customerRepository.findAll();
	}
	
//	adding products to customer Wishlist
	
	public Customer AddProducttoWishList(int uid,int pid) throws Exception {
		Customer c= customerRepository.getById(uid);
		if(c!=null) {
			WishList w = customerRepository.findByProductID(pid);
			if(w==null) {
				WishList cart = new WishList(pid);
				c.addtoWishList(cart);
				customerRepository.save(cart);
				return c;
			}else {
				throw new Exception("Product already in WishList");
			}
			
			
		}else {
			throw new UsernameNotFoundException("User not found");
		}
//		if(c!=null) {
//			WishList w = new WishList(pid);
//			
//			WishList w1 = customerRepository.findByProductID(pid);
//			CartList c1 = customerRepository.findByCartProductID(pid);
//		
//			if(w1 == null || c1 == null) {
//				c.addtoWishList(w);
//				customerRepository.save(w);
//			}else {
//				throw new Exception("Already exist");
//			}
//			
//			return c;
//		}else {
//			throw new UsernameNotFoundException("UserNot found");
//		}
			
	}
	
//	adding products to Cartlist
	public Customer AddProducttoCartlist(int uid,int pid) throws Exception {
		Customer c = customerRepository.getById(uid);
		CartList cart = new CartList(pid);
		if(c!=null) {
			WishList wl = customerRepository.findByProductID(pid);
			if(wl!=null) {
//				System.out.println("wl"+wl.getId()+"Pid"+wl.getProductID());
				customerRepository.remove(wl.getProductID());
				c.addtocart(cart);
				customerRepository.save(cart);
				return c;
			}else {
				System.out.println("Uptohere");
				c.addtocart(cart);
				customerRepository.save(cart);
				return c;
				
//				if(cl != null) {
//										
//				}else {
//					throw new Exception("alredy exist");
//				}
//				CartList c2 = customerRepository.findByCartProductID(pid);
//				if(c2==null) {
//					c.addtocart(cart);
//					customerRepository.save(cart);
//				}else {
//					throw new Exception("alredy exist");
//				}
//				c.addtocart(cart);
//				customerRepository.save(cart);
				
				
			}
			
		}else {
			throw new UsernameNotFoundException("UserNot found");
		}
		
	}
	
//  Admin Operations 
	
//	Admin to delete the customer 
	
	public void deleteCustomer(String email) {
		Customer c = customerRepository.findByEmail(email);
		if(c!=null) {
			customerRepository.delete(c);
			System.out.println("Deleted successFully");
		}else {
			throw new UsernameNotFoundException(email);
		}
	}
	
//	Admin to update the customer
	
//	public Customer updateCustomer(Customer customer) {
//		Customer c = customerRepository.findByEmail(customer.getEmail());
//		if(c!=null) {
//			c.setPhone(customer.getPhone());
//			c.setUsername(customer.getUsername());
//			return c;
//		}else {
//			throw new UsernameNotFoundException("User not fonund with "+customer.getEmail());
//		}
//	}
	
	public void UpdateCustomer(String username,String phone) {
		Customer c = customerRepository.findByUsername(username);
		if(c!=null) {
			customerRepository.UpdateCustomer(phone, username);
		}else {
			throw new UsernameNotFoundException("User Not Found With the Usernam "+username);
		}
	}
	
//	to delete product from Wishlist
	
public void deleteWish(int id) {
	customerRepository.remove(id);
}
// to delete product from cart list
public void deleteCartitem(int id) {
	customerRepository.removecartItem(id);
}

//delete all the cartProducts
public void deleteAllCartItems() {
	customerRepository.deleteallCart();
}



//adding address
public void  SaveDeliveryaddress(int uid, String hno,String address,String landmark,String state,String pincode,String country,String mobile) {
	Customer c = customerRepository.getById(uid);
	System.out.println(c);
	Address add = new Address(hno, address, landmark, state, pincode, country, mobile);
	c.setDeliveryAddress(add);
	customerRepository.save(add);
	
}

//getting users by search

public List<Customer> getallCustomerbySearch(String name){
	return customerRepository.getCustomersByNamesearch(name);
}

	
	

}
