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
    public Agency createAgency (Agency agency){
        System.out.println(agency.toString());
        return controller.createAgency(agency);
    }

    @PUT
    @SecuredAgency
    @Path("/edit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Agency editAgency (Agency agency) {
        return controller.updateAgency(agency);
    }

    @GET
    @SecuredAgency
    @Path("/view/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Agency consultAgency (@PathParam("id") Integer id) {
        return controller.getAgency(id);
    }

    @PUT
    @SecuredAdmin
    @Path("/activate/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String activateAgency (@QueryParam("id") Integer id) {
        return controller.activateAgency(id);
    }

    @DELETE
    @SecuredAdmin
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteAgency (@PathParam("id") Integer id) {
        return controller.deleteAgency(id);
    }

    @GET
    @SecuredAgency
    @Path("/vehicle/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Vehicle> View_Vehicles (@PathParam("id") Integer id) {
        return controller.getAgencyVehicles(id);
    }

    @POST
    @SecuredAgency
    @Path("/list")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Vehicle> View_Agency (@QueryParam("id") Integer id) {
        return controller.getChildAgencies(id);
    }

}
