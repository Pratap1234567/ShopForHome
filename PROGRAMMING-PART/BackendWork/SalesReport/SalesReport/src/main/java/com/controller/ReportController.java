package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Dayreport;
import com.model.Report;
import com.repository.reportDao;
import com.service.ReportService;
@CrossOrigin
@RestController
public class ReportController {

	@Autowired
	private ReportService reportService;
	
	@PostMapping(value="salereport/{category}/{pname}/{qty}/{tprice}/{userid}/{username}")
	private Report saveUserreport(@PathVariable("category") String category,@PathVariable("pname") String Pname,@PathVariable("qty") int Qty,@PathVariable("tprice") int Tprice,@PathVariable("userid") int userid,@PathVariable("username") String Username) {
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
	@GetMapping(value = "todayReport")
	private List<Dayreport> gettodayreport(){
		return reportService.getdayreport();
	}
	
	@GetMapping(value = "CategoryReport")
	private List<Dayreport> getCategoryreport(){
		return reportService.getCategoryreport();
	}
	
	@GetMapping(value = "getReport")
	private List<Report> getreport(){
		return reportService.getReport();
	}
	@GetMapping(value = "income")
	private int getincome() {
		return reportService.getincome();
	}
}
