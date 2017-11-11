package controller;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import model.Vehicle;

@Stateless
@ApplicationPath("/api")
@Path("/vehicle")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class VehicleController extends ApiController{
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
	
	@GET
	@Path("/create/{brand}/{price}/{insurance}/{idAgency}/{idType}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle createVehicle (@PathParam("brand") String brand,
			@PathParam("price") Float price,
			@PathParam("insurance") String insurance,
			@PathParam("idAgency") Integer idAgency,
			@PathParam("idType") Integer idType){
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
	
	@GET
	@Path("/edit/{id}/{brand}/{price}/{insurance}/{idAgency}/{idType}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle editVehicle (@PathParam("id") Integer id,
			@PathParam("brand") String brand,
			@PathParam("price") Float price,
			@PathParam("insurance") String insurance,
			@PathParam("idAgency") Integer idAgency,
			@PathParam("idType") Integer idType) {
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
	
	@GET
	@Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteVehicle (@PathParam("id") Integer id) {
		Vehicle vehicleRet = entityManager.find(Vehicle.class, id);
		entityManager.detach(vehicleRet);
		entityManager.flush();
		return ("Vehicle successfully deleted");
	}

}
