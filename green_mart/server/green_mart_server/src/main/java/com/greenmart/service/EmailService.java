package com.greenmart.service;

 
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
	
	 
	public EmailService(JavaMailSender mailSender) {
		this.mailSender = mailSender;
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
    
    public void sendPasswordUpdateEmail(String to, String firstName) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Password Updated Successfully");

            String htmlContent = """
                    <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.5;">
                        <h2 style="color: #2E8B57;">Password Update Confirmation</h2>
                        <p>Hi <b>%s</b>,</p>
                        <p>Your password has been <strong>updated successfully</strong>.</p>
                        <p>If you did not perform this change, please contact our support immediately.</p>
                        <br/>
                        <a href="http://localhost:5173" 
                           style="display:inline-block; padding: 10px 15px; background-color: #2E8B57; 
                                  color: white; text-decoration: none; border-radius: 5px;">
                            Go to Home
                        </a>
                        <br/><br/>
                        <p>Best Regards,<br/>The GreenMart Team</p>
                    </body>
                    </html>
                    """.formatted(firstName);

            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send password update email", e);
        }
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
    
    public void sendWelcomeEmail(String to, String firstName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Welcome to Green Mart!");

            String htmlContent = "<html>" +
                    "<body style='font-family: Arial, sans-serif;'>" +
                    "<h2 style='color: green;'>Welcome to Green Mart, " + firstName + "!</h2>" +
                    "<p>You have successfully registered to <b>Green Mart</b>.</p>" +
                    "<p>We’re excited to have you with us. Happy Shopping! 🛒</p>" +
                    "<br/>" +
                    "<a href='http://localhost:5173' " +
                    "style='display: inline-block; padding: 10px 20px; background-color: #28a745; " +
                    "color: white; text-decoration: none; border-radius: 5px;'>Browse Now</a>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true); // true for HTML content
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send welcome email", e);
        }
    }
}
