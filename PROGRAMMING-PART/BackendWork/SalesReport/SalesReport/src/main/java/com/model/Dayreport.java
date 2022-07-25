package com.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Dayreport {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private float qty;
	private String Category;
	public Dayreport() {
		super();
	}
	public Dayreport( long qty, String category) {		
		this.qty = qty;
		Category = category;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public float getQty() {
		return qty;
	}
	public void setQty(float qty) {
		this.qty = qty;
	}
	public String getCategory() {
		return Category;
	}
	public void setCategory(String category) {
		Category = category;
	}
	

}
