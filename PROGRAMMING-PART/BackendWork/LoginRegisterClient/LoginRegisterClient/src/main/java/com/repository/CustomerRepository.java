package com.repository;

import java.util.Optional;

import org.hibernate.annotations.SQLDelete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.model.Address;
import com.model.CartList;
import com.model.Customer;
import com.model.WishList;
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{

	

	Customer findByEmail(String email);

	void save(WishList w);

	void save(CartList cart);
	
	@Query("select w from WishList w where w.productID = :pid")
	public WishList findByProductID(@Param("pid") int pid);
	
	@Query("select w from CartList w where w.productID = :pid")
	public CartList findByCartProductID(@Param("pid") int pid);
	
	@Modifying
	@Transactional
	@Query("delete from WishList w where w.productID = :pid")
	public void remove(@Param("pid") int pid);
	
	@Modifying
	@Transactional
	@Query("delete from CartList w where w.productID = :pid")
	public void removecartItem(@Param("pid") int pid);

	Customer findByUsername(String username);
	
	@Modifying
	@Transactional
	@Query("update Customer c set c.phone = :phone where c.username = :username")
	public void UpdateCustomer(@Param("phone") String phone ,@Param("username") String username);

	void save(Address add);
	
	
	@Modifying
	@Transactional
	@Query("delete from  CartList m")
	public void deleteallCart();

	

	

	
	
	

}
