package endpoints;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import controller.CartController;
import controller.MailerController;
import io.swagger.annotations.Api;
import model.CartItem;
import model.Mail;

@Stateless
@ApplicationPath("/api")
@Path("/mailer")
@Api("mailer")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MailerEndpoint extends Application{

	@EJB
	protected MailerController controller;
	
	@POST
 	@Path("/send")
 	@Consumes(MediaType.APPLICATION_JSON)
 	@Produces(MediaType.APPLICATION_JSON)
 	public Response sendMail(Mail mail) {
 		try {
 			return Response.status(200).entity(controller.send(mail.getAddress(), mail.getSubject(), mail.getContent())).build();	
 		}
 		catch (Exception ex){
 			return Response.status(400).entity("Impossible d'ajouter l'item").build();
 		}
 	}
}
