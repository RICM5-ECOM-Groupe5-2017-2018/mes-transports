package endpoints;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.EJBTransactionRolledbackException;
import javax.ejb.Stateless;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import controller.AgencyController;
import controller.CartController;
import io.swagger.annotations.Api;
import model.Agency;
import model.CartItem;
import security.Secured;
import security.SecuredAgency;

@Stateless
@ApplicationPath("/api")
@Path("/cart")
@Api("cart")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class CartEndpoint extends Application {

	 @EJB
	 protected CartController controller;
	 
	 	@GET
	   //	 @Secured
	    @Path("/view/{id}")
	    @Consumes(MediaType.APPLICATION_JSON)
	    @Produces(MediaType.APPLICATION_JSON)
	    public Response consultCart (@PathParam("id") Integer id) {
		 	try {
		        return Response.status(200).entity(controller.getCart(id)).build();
		 	}
			catch(EJBTransactionRolledbackException ex) {
				return Response.status(200).entity((new LinkedList<CartItem>())).build();
			}
			catch (Exception ex) {
				return Response.status(400).entity("Impossible d'afficher le cart").build();
			}
	    }
	 	
	 	@POST
	 	//@Secured
	 	@Path("/add")
	 	@Consumes(MediaType.APPLICATION_JSON)
	 	@Produces(MediaType.APPLICATION_JSON)
	 	public Response addCartItem(CartItem modelItem) {
	 		try {
	 			return Response.status(200).entity(controller.addToCart(modelItem)).build();	
	 		}
	 		catch (Exception ex){
	 			return Response.status(400).entity("Impossible d'ajouter l'item").build();
	 		}
	 	}
	 	
	 	@DELETE
	 	//@Secured
	 	@Path("/delete/{cartid}")
	 	@Consumes(MediaType.APPLICATION_JSON)
	 	@Produces(MediaType.APPLICATION_JSON)
	 	public Response deleteCartItem(@PathParam("cartid") Integer CartItemId) {
	 		try {
	 			return Response.status(200).entity(controller.deleteFromCart(CartItemId)).build();
	 		}
	 		catch (Exception ex) {
	 			return Response.status(400).entity("Impossible de supprimer cet item").build();
	 		}
	 		
	 	}
	 	
	 	@POST
	 	@Path("/validate")
	 	@Consumes(MediaType.APPLICATION_JSON)
	 	@Produces(MediaType.APPLICATION_JSON)
	 	public Response validateCart(List<CartItem> cart) {
	 		try {
	 			return Response.status(200).entity(controller.declareDone(cart)).build();
	 		}
	 		catch (Exception ex) {
	 			return Response.status(400).entity("Probléme dans les données").build();
	 		}
	 	}

}
