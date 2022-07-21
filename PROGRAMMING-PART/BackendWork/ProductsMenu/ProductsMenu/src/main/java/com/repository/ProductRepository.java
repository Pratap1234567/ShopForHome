package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.Model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

	Product getByName(String name);

	Product getByImageurl(String imageurl);
	
	
	@Query("select m from Product m where m.category like concat( '%',:cname,'%')")
	public List<Product> getproductsbyCategory(@Param("cname") String cname);
	
	@Query("select m from Product m where m.name like concat( '%',:cname,'%')")
	public List<Product> getproductsbyName(@Param("cname") String cname);

	@Modifying
	@Transactional
	@Query("update Product c set c.qty = :sqty where c.id = :id")
	public void updateQty(@Param("sqty") int sqty,@Param("id") int id);

	
	
	@Query("select m from Product m order by m.price asc")
	public List<Product> pricesortedProducts();


}
