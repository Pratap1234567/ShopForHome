package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.model.report;
@Repository
public interface reportDao extends JpaRepository<report,Integer> {
	@Query("select sum(r.TotalPrice) as tprice from report r")
	public int getTotalSalePrice();
	@Query("select sum(r.Qty) as tqty from report r")
	public int getTotalQty();

}
