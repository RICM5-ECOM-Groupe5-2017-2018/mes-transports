package endpoints;

import controller.VehicleController;
import io.swagger.annotations.Api;
import model.AssignCharacteristic;
import model.Vehicle;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;
import java.util.List;

@ApplicationPath("/api")
@Path("/vehicle")
@Api("vehicle")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class VehicleEndpoint extends Application{

    @EJB
    protected VehicleController controller;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createVehicle (Vehicle vehicle){
        try {
            return Response.status(200).entity(controller.createVehicle(vehicle)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Format de l'entité invalide").build();
        }
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/addCharac/{idVehicle}/{idCharacteristic}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCharacteristic(AssignCharacteristic Assign_characteristic
    								  ,@PathParam("idVehicle") Integer idVehicle
    								  ,@PathParam("idCharacteristic") Integer idCharacteristic){
    	try {
    		return Response.status(200).entity(controller.addCharacteristic(idVehicle,idCharacteristic,Assign_characteristic.getValueCharacteristic())).build();
    	} catch(Exception ex) {
    		return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
    	}
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/editCharac/{idVehicle}/{idCharacteristic}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response editCharacteristic(AssignCharacteristic Assign_characteristic
    								  ,@PathParam("idVehicle") Integer idVehicle
    								  ,@PathParam("idCharacteristic") Integer idCharacteristic){
    	try {
    		return Response.status(200).entity(controller.editCharacteristic(idVehicle,idCharacteristic,Assign_characteristic.getValueCharacteristic())).build();
    	} catch(Exception ex) {
    		return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
    	}
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/edit")
    @Produces(MediaType.APPLICATION_JSON)
    public Response editVehicle (Vehicle vehicle) {
        try {
            return Response.status(200).entity(controller.editVehicle(vehicle)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Format de l'entité invalide").build();
        }
    }
    
    
    
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/list/{idType}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCharacteristics (@PathParam("idType") Integer idType){
        try {
            return Response.status(200).entity(controller.getCharacteristicsByType(idType)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
        }
    }
    
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCharacteristics (){
        try {
            return Response.status(200).entity(controller.getCharacteristics()).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondante").build();
        }
    }
    
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/type")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTypeVehicle (){
        try {
            return Response.status(200).entity(controller.getTypeVehicle()).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondante ").build();
        }
    }

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/view/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response consultVehicle (@PathParam("id") Integer id) {
        try {
            return Response.status(200).entity(controller.consultVehicle(id)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
        }
    }

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/rents/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response rentVehicle(@PathParam("id") Integer id) {
    	try {
    		return Response.status(200).entity(controller.getRents(id)).build();
    	} catch(Exception ex){
    		return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
    	}
    }
    
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteVehicle (@PathParam("id") Integer id) {
        try {
            return Response.status(200).entity(controller.deleteVehicle(id)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
        }
    }

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/search/{startDate}/{endDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchVehicle (@PathParam("startDate") String startDate,
                                        @PathParam("endDate") String endDate) {
        try {
            return Response.status(200).entity(controller.searchVehicle(startDate, endDate)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Le format de la date est invalide").build();
        }
    }
}
