package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.model.Dayreport;
import com.model.Report;
@Repository
public interface reportDao extends JpaRepository<Report,Integer> {
	@Query("select sum(r.TotalPrice) as tprice from Report r")
	public int getTotalSalePrice();
	
	@Query("select sum(r.Qty) as tqty from Report r")
	public int getTotalQty();
	
	@Query("select new com.model.Dayreport(sum(m.Qty) ,m.Category) from Report m where m.OrderDate =(select max(p.OrderDate) from Report p ) group by m.OrderDate,m.Category")
	public List<Dayreport> getTodayreport();
	
	@Query("select new com.model.Dayreport(sum(m.Qty) ,m.Category) from Report m group by m.Category")
	public List<Dayreport> getCategoryreport();
	
	
	@Query("select sum(m.TotalPrice) from Report m")
	public int getincome();
	
	

}
// m.id,m.Category,m.Productname,sum(m.Qty) as Qty,m.TotalPrice,m.userid,m.Username,m.OrderDate