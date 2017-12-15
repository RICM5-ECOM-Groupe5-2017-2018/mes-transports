package endpoints;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import controller.TransactionController;
import io.swagger.annotations.Api;

@Stateless
@ApplicationPath("/api")
@Path("/transaction")
@Api("transaction")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TransactionEndpoint extends Application{

	@EJB
	protected TransactionController controller;
	
	@GET
	@Path("/get/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTransaction(@PathParam("id") Integer transactionId) {
		try {
            return Response.status(200).entity(controller.get(transactionId)).build();
        }
        catch(Exception e) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune transaction ne correspond a cette id").build();
        }
	}
}
