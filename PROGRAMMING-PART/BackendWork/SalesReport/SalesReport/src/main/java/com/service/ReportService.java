package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.report;
import com.repository.reportDao;
@Service
public class ReportService {
	@Autowired
	reportDao reportdao;
	
//	adding the report details
	public report SaveUserReport(String category,String Pname,int Qty,int Tprice,int userid,String Username) {
		report r = new report(category, Pname, Qty, Tprice, userid, Username);
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

}
