package com.greenmart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.greenmart.entities.Order;
import com.greenmart.entities.User;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
	private final JavaMailSender mailSender;
	
	@Autowired
	public EmailService(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}
	
	public void sendEmail(String to, String subject, String body) {
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setFrom("rohansawant632@gmail.com");
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);
		
		mailSender.send(message);
		System.out.println("Email sent successfully");
	}
	
	public void sendEmailWithButton(String to, String subject, String messageBody, String buttonUrl) throws MessagingException{
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
		
		helper.setFrom("rohansawant632@gmail.com");
		helper.setTo(to);
		helper.setSubject(subject);
		
		String htmlContent = "<DOCTYPE html>" +
				"<html>" + 
				"<body style='font-family: Arial, sans-serif;'>" + 
				"<h2 style='color: #333;'>" + messageBody + "</h2>" + 
				"<a href='" + buttonUrl + "' style='" + "display:inline-block;padding:12px 24px;margin-top:15px;" +
				"background-color:#28a745;color:white;text-decoration:none;" +
				"border-radius:6px;font-size:16px;font-weight:bold;" + 
				"'>Browse Now</a>" + 
				"</body>" + 
				"</html>";
		
		helper.setText(htmlContent, true);
		mailSender.send(mimeMessage);
		System.out.println("Email sent with HTML button");
				
	}
	
	public void sendHtmlEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // true for HTML
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
	
    public void sendOrderConfirmationEmail(User user, Order order) {
        String subject = "Order Confirmation - Order #" + order.getId();
        String htmlBody = buildOrderConfirmationHtml(user, order);

        sendHtmlEmail(user.getEmail(), subject, htmlBody);
    }
    
    private String buildOrderConfirmationHtml(User user, Order order) {
        StringBuilder htmlBody = new StringBuilder();
        htmlBody.append("<html><body style='font-family: Arial, sans-serif;'>")
            .append("<h2 style='color: #4CAF50;'>Thank you for your order, ")
            .append(user.getFirstName()).append("!</h2>")
            .append("<p>Your order ID is: <b>").append(order.getId()).append("</b></p>")
            .append("<p>Total Amount: <b>Rs").append(order.getOrderAmount()).append("</b></p>")
            .append("<h3>Order Details:</h3>")
            .append("<table style='border-collapse: collapse; width: 100%;'>")
            .append("<tr style='background-color: #f2f2f2;'>")
            .append("<th style='border: 1px solid #ddd; padding: 8px;'>Product</th>")
            .append("<th style='border: 1px solid #ddd; padding: 8px;'>Quantity</th>")
            .append("<th style='border: 1px solid #ddd; padding: 8px;'>Price</th>")
            .append("</tr>");

        order.getOrderLines().forEach(line -> {
            htmlBody.append("<tr>")
                .append("<td style='border: 1px solid #ddd; padding: 8px;'>")
                .append(line.getProduct().getProdName()).append("</td>")
                .append("<td style='border: 1px solid #ddd; padding: 8px;'>")
                .append(line.getQuantity()).append("</td>")
                .append("<td style='border: 1px solid #ddd; padding: 8px;'>Rs")
                .append(line.getPrice()).append("</td>")
                .append("</tr>");
        });

        htmlBody.append("</table>")
            .append("<br><p>We will notify you once your order is shipped.</p>")
            .append("<a href='http://localhost:5173/' style='display:inline-block;padding:10px 20px;background-color:#4CAF50;color:white;text-decoration:none;border-radius:5px;'>Browse Now</a>")
            .append("<br><br><p>Regards,<br>Green Mart</p>")
            .append("</body></html>");

        return htmlBody.toString();
    }
}
