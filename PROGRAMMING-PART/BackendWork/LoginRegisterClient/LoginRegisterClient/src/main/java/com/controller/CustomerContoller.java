package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Address;
import com.model.Customer;

import com.service.CustomerService;

@RestController
//@RequestMapping("Homedecors")
@CrossOrigin
public class CustomerContoller {
	@Autowired
	CustomerService customerService;

	@GetMapping(value = "hellouser")
	public String sayHello() {
		return "hello customer";
	}

	@GetMapping(value = "helloadmin")
	public String sayHelloadmin() {
		return "hello admin";
	}

	@GetMapping(value = "AllCustomers")
	public List<Customer> getallCustomers() {
		return customerService.getallCustomers();
	}

	@PostMapping(value = "addingtoWishlist")
	public Customer addingtoWishlist(int uid, int pid) throws Exception {
		return customerService.AddProducttoWishList(uid, pid);
	}

	@PostMapping(value = "addingtoCartList/{uid}/{pid}")
	public Customer addingtoCartList(@PathVariable("uid") int uid, @PathVariable("pid") int pid) throws Exception {
		return customerService.AddProducttoCartlist(uid, pid);
	}

	@PostMapping(value = "getUserbyUsername/{username}")
	public Customer getuserbyUsername(@PathVariable("username") String username) {
		return this.getuserbyUsername(username);
	}

	@GetMapping(value = "getUserById/{id}")
	public Customer getUserbyId(@PathVariable("id") int id) {
		return customerService.getUserbyId(id);
	}

	@DeleteMapping(value = "deleteWishitem/{id}")
	public void deleteWishitem(@PathVariable("id") int id) {
		customerService.deleteWish(id);
	}

	@DeleteMapping(value = "deletecartitem/{id}")
	public void deletecartitem(@PathVariable("id") int id) {
		customerService.deleteCartitem(id);
	}
	@DeleteMapping(value="DeleteCart")
	public void deleteallCart() {
		this.customerService.deleteAllCartItems();
	}

//	Admin Operations

	@DeleteMapping(value = "admin/DeleteCustomer/{email}")
	public void DeleteCustomer(@PathVariable("email") String email) {
		customerService.deleteCustomer(email);
	}

	@PutMapping(value = "admin/UpdateCustomer/{username}/{phone}")
	public void Updatecustomer(@PathVariable("phone") String phone, @PathVariable("username") String username) {
		customerService.UpdateCustomer(username, phone);
	}

	@GetMapping(value = "admin/GetUserByUsername/{username}")
	public Customer CustgetUserByUsername(@PathVariable("username") String username) {
		return customerService.getuserbyUsername(username);
	}

	@GetMapping(value = "admin/GetAllUsers")
	public List<Customer> getAllCustomers() {
		return customerService.getallCustomers();
	}

//	Adding Address
	@PostMapping(value = "saveAddress/{uid}/{hno}/{address}/{landmark}/{state}/{pincode}/{country}/{mobile}")
	public void AddAddress(@PathVariable("uid") int uid, @PathVariable("hno") String hno,
			@PathVariable("address") String address, @PathVariable("landmark") String landmark,
			@PathVariable("state") String state, @PathVariable("pincode") String pincode,
			@PathVariable("country") String country, @PathVariable("mobile") String mobile) {
		customerService.SaveDeliveryaddress(uid, hno, address, landmark, state, pincode, country, mobile);
	}

}
