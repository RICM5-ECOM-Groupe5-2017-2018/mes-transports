package endpoints;

import controller.AgencyController;
import io.swagger.annotations.Api;
import model.Agency;
import model.Vehicle;
import security.SecuredAdmin;
import security.SecuredAgency;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
    @SecuredAgency
    @Path("/view/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response consultAgency (@PathParam("id") Integer id) {
        try {
            return Response.status(200).entity(controller.getAgency(id)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
        }
    }

    @PUT
    @SecuredAdmin
    @Path("/activate/{id}")
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
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response View_Agency (@PathParam("id") Integer id) {
        try {
            return Response.status(200).entity(controller.getChildAgencies(id)).build();
        } catch (Exception ex) {
            return Response.status(400).type("text/plain")
                    .entity("Aucune entité correspondant à cet Id").build();
        }
    }

}
