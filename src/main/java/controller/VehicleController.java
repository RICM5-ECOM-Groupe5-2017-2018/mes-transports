package controller;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import io.swagger.annotations.Api;
import model.Vehicle;

@Stateless
@ApplicationPath("/api")
@Path("/vehicle")
@Api("vehicle")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class VehicleController extends ApiController{
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/create/{brand}/{price}/{insurance}/{idAgency}/{idType}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle createVehicle (@FormParam("brand") String brand,
			@FormParam("price") Float price,
			@FormParam("insurance") String insurance,
			@FormParam("idAgency") Integer idAgency,
			@FormParam("idType") Integer idType){
		Vehicle vehicleRet = new Vehicle();
		vehicleRet.setBrand(brand);
		vehicleRet.setPrice(price);
		vehicleRet.setInsurance(insurance);
		vehicleRet.setIdAgency(idAgency);
		vehicleRet.setType(idType);
		entityManager.persist(vehicleRet);
		entityManager.flush();
		return vehicleRet;
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/edit/{id}/{brand}/{price}/{insurance}/{idAgency}/{idType}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle editVehicle (@FormParam("id") Integer id,
			@FormParam("brand") String brand,
			@FormParam("price") Float price,
			@FormParam("insurance") String insurance,
			@FormParam("idAgency") Integer idAgency,
			@FormParam("idType") Integer idType) {
		Vehicle vehicleRet = entityManager.find(Vehicle.class, id);
		vehicleRet.setBrand(brand);
		vehicleRet.setPrice(price);
		vehicleRet.setInsurance(insurance);
		vehicleRet.setIdAgency(idAgency);
		vehicleRet.setType(idType);
		entityManager.merge(vehicleRet);
		entityManager.flush();
		return vehicleRet;
		
	}
	
	@GET
	@Path("/view/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle consultVehicle (@PathParam("id") Integer id) {
		Vehicle vehicleRet = entityManager.find(Vehicle.class, id);
		return vehicleRet;
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteVehicle (@FormParam("id") Integer id) {
		Vehicle vehicleRet = entityManager.find(Vehicle.class, id);
		entityManager.detach(vehicleRet);
		entityManager.flush();
		return ("Vehicle successfully deleted");
	}

}
