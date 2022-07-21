package com.Controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.EmailService;

@RestController
@CrossOrigin
public class EmailController {
	
	@Autowired
	private EmailService emailService;
	@PostMapping(value="email")
	public void sendEmail(String tomail,String subject,String body ,String  attachment) throws MessagingException {
		this.emailService.SendMail(tomail, subject, body, attachment);;
	}

}
