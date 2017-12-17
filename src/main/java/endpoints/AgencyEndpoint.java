package endpoints;

import controller.AgencyController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import model.Agency;
import model.Vehicle;
import security.SecuredAdmin;
import security.SecuredAgency;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.transaction.Transaction;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.Date;
import java.util.List;

@Stateless
@ApplicationPath("/api")
@Path("/agency")
@Api("agency")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AgencyEndpoint extends Application {

    @EJB
    protected AgencyController controller;

    @POST
    @SecuredAgency
    @Path("/create")
    @ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAgency (Agency agency){
        try {
            return Response.status(200).entity(controller.createAgency(agency)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Format de l'entité invalide").build();
        }
    }

    @PUT
    @SecuredAgency
    @Path("/edit")
    @ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editAgency (Agency agency) {
        try {
            return Response.status(200).entity(controller.updateAgency(agency)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Format de l'entité invalide").build();
        }
    }
    
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/rents/{id}/{start_date}/{end_date}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response rentVehicle(@PathParam("id") Integer id
    						   ,@PathParam("start_date") String start_date
    						   ,@PathParam("end_date") String end_date){
    	try {
    		return Response.status(200).entity(controller.getRents(id,start_date,end_date)).build();
    	} catch(Exception ex){
    		return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
    	}
    }
    

    @GET
    @SecuredAgency
    @Path("/view/{id}")
    @ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response consultAgency (@PathParam("id") Integer id) {
        try {
        	Agency a = controller.getAgency(id);
        	if(a==null) return Response.status(400).type("text/plain")
        				.entity("Aucune entité correspondant à cet Id").build();
        	else return Response.status(200).entity(a).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
        }
    }
    
    @GET
    @SecuredAdmin
    @Path("/getAllAgencies")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAgencies () {
        try {
            return Response.status(200).entity(controller.getAllAgencies()).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
        }
    }

    @PUT
    @SecuredAdmin
    @Path("/activate/{id}")
    @ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response activateAgency (@PathParam("id") Integer id) {
        try {
            return Response.status(200).entity(controller.activateAgency(id)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
        }
    }
    
    @GET
    @SecuredAgency
    @Path("/transactions/{id}/{start_date}/{end_date}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTransactions(@PathParam("id") Integer id,
    								@PathParam("start_date") String start,
    								@PathParam("end_date") String end) {
    	try {
    		return Response.status(200).entity(controller.getTransactions(id, start, end)).build();
    	}catch(Exception ex) {
    		return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
    	}
    }

    @DELETE
    @SecuredAdmin
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAgency (@PathParam("id") Integer id) {
        try {
            return Response.status(200).entity(controller.deleteAgency(id)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
        }
    }

    @GET
    @SecuredAgency
    @Path("/vehicle/{id}")
    @ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response View_Vehicles (@PathParam("id") Integer id) {
        try {
            return Response.status(200).entity(controller.getAgencyVehicles(id)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
        }
    }

    @GET
    @SecuredAgency
    @Path("/list/{id}")
    @ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response View_Agency (@PathParam("id") Integer id) {
        try {
            return Response.status(200).entity(controller.getChildAgencies(id)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("forbiden").build();
        }
    }

}
