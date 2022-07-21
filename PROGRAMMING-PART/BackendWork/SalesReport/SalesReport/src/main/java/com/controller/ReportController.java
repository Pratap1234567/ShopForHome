package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.report;
import com.repository.reportDao;
import com.service.ReportService;
@CrossOrigin
@RestController
public class ReportController {

	@Autowired
	private ReportService reportService;
	
	@PostMapping(value="salereport/{category}/{pname}/{qty}/{tprice}/{userid}/{username}")
	private report saveUserreport(@PathVariable("category") String category,@PathVariable("pname") String Pname,@PathVariable("qty") int Qty,@PathVariable("tprice") int Tprice,@PathVariable("userid") int userid,@PathVariable("username") String Username) {
		return reportService.SaveUserReport(category, Pname, Qty, Tprice, userid, Username);
	}
	
	@GetMapping("report/totalamount")
	private int getTotalsaleAmount() {
		return reportService.getTotalSaleAmount();
	}
	
	@GetMapping("report/totalqty")
	private int getTotalqtysale() {
		return reportService.getTotalqtysale();
	}
	
	
}
