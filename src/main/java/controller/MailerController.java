package controller;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.ejb.Stateless;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import io.swagger.annotations.Api;
import model.Characteristic;
import model.CharacteristicType;
import model.Rent;
import model.Vehicle;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Properties;

@Stateless
@ApplicationPath("/api")
@Path("/mailer")
@Api("mailer")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class MailerController extends ApiController {

	private static final String SMTP_HOST1 = "smtp.gmail.com";
	private static final String LOGIN_SMTP1 = "mestransports.ecom@gmail.com";
	private static final String IMAP_ACCOUNT1 = "mestransports.ecom@gmail.com";
	private static final String PASSWORD_SMTP1 = "Ecom2017";

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/send")
	@Produces(MediaType.APPLICATION_JSON)
	public void send(@QueryParam("mailAddress") String address,
			@QueryParam("subject") String subject,
			@QueryParam("content") String content) {
		Properties properties = new Properties();
		properties.setProperty("mail.transport.protocol", "smtp");
		properties.setProperty("mail.smtp.starttls.enable", "true");
		properties.setProperty("mail.smtp.port", "587");
		properties.setProperty("mail.smtp.host", SMTP_HOST1);
		properties.setProperty("mail.smtp.user", LOGIN_SMTP1);
		properties.setProperty("mail.from", IMAP_ACCOUNT1);
		Session session = Session.getInstance(properties);

		// 2 -> Création du message
		MimeMessage message = new MimeMessage(session);
		try {
			message.setText(content);
			message.setSubject(subject);
			message.addRecipients(Message.RecipientType.TO, address);
		} catch (MessagingException e) {
			e.printStackTrace();
		}

		// 3 -> Envoi du message
		Transport transport = null;
		try {
			transport = session.getTransport("smtp");
			transport.connect(LOGIN_SMTP1, PASSWORD_SMTP1);
			transport.sendMessage(message, new Address[] { new InternetAddress(address) });
		} catch (MessagingException e) {
			e.printStackTrace();
		} finally {
			try {
				if (transport != null) {
					transport.close();
				}
			} catch (MessagingException e) {
				e.printStackTrace();
			}
		}
		return;
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/attached")
	@Produces(MediaType.APPLICATION_JSON)
	public void send_attached(@QueryParam("mailAddress") String address,
			@QueryParam("subject") String subject,
			@QueryParam("content") String content,
			@QueryParam("path_to_attachement") String path) {
		// 1 -> Création de la session
		Properties properties = new Properties();
		properties.setProperty("mail.transport.protocol", "smtp");
		properties.setProperty("mail.smtp.starttls.enable", "true");
		properties.setProperty("mail.smtp.port", "587");
		properties.setProperty("mail.smtp.host", SMTP_HOST1);
		properties.setProperty("mail.smtp.user", LOGIN_SMTP1);
		properties.setProperty("mail.from", IMAP_ACCOUNT1);
		Session session = Session.getInstance(properties);

		// 2 -> Création du message avec pièce jointe
		File file = new File(path + "/H.jpg");
		FileDataSource datasource1 = new FileDataSource(file);
		DataHandler handler1 = new DataHandler(datasource1);
		MimeBodyPart autruche = new MimeBodyPart();
		try {
			autruche.setDataHandler(handler1);
			autruche.setFileName(datasource1.getName());
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		MimeBodyPart body = new MimeBodyPart();
		try {
			body.setContent("YOLO", "text/plain");
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		MimeMultipart mimeMultipart = new MimeMultipart();
		try {
			mimeMultipart.addBodyPart(body);
			mimeMultipart.addBodyPart(autruche);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		MimeMessage message = new MimeMessage(session);
		try {
			message.setContent(mimeMultipart);
			message.setSubject(subject);
			message.addRecipients(Message.RecipientType.TO, address);
		} catch (MessagingException e) {
			e.printStackTrace();
		}

		// 3 -> Envoi du message
		Transport transport = null;
		try {
			transport = session.getTransport("smtp");
			transport.connect(LOGIN_SMTP1, PASSWORD_SMTP1);
			transport.sendMessage(message, new Address[] { new InternetAddress(address) });
		} catch (MessagingException e) {
			e.printStackTrace();
		} finally {
			try {
				if (transport != null) {
					transport.close();
				}
			} catch (MessagingException e) {
				e.printStackTrace();
			}
		}
	}
}
