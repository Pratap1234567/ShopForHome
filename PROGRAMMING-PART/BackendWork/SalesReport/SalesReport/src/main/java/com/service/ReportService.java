package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Dayreport;
import com.model.Report;
import com.repository.reportDao;
@Service
public class ReportService {
	@Autowired
	reportDao reportdao;
	
//	adding the report details
	public Report SaveUserReport(String category,String Pname,int Qty,int Tprice,int userid,String Username) {
		Report r = new Report(category, Pname, Qty, Tprice, userid, Username);
		reportdao.save(r);
		return r;
		
		
	}
	
//	to get total amount
	public int getTotalSaleAmount() {
		return reportdao.getTotalSalePrice();
	}
	
	
//	to get the totalQty
	public int getTotalqtysale() {
		return reportdao.getTotalQty();
	}
	
	
//	All report operations
	
//	today sales report
	public List<Dayreport> getdayreport(){
		return reportdao.getTodayreport();
	}
	
	public List<Report> getReport(){
		return reportdao.findAll();
	}
	
//	Category report
	 public List<Dayreport> getCategoryreport(){
		 return reportdao.getCategoryreport();
	 }
	 
	 public int getincome() {
		 return reportdao.getincome();
	 }

}
