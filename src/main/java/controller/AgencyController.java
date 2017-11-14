package controller;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import io.swagger.annotations.Api;
import model.Agency;

@Stateless
@ApplicationPath("/api")
@Path("/agency")
@Api("agency")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AgencyController extends ApiController{
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
	
	@GET
	@Path("/create/{type}/{adress}/{phone}/{idMotherAgency}")
	@Produces(MediaType.APPLICATION_JSON)
	public Agency createAgency (@PathParam("type") String type,
			@PathParam("adress") String adress,
			@PathParam("phone") String phone,
			@PathParam("idMotherAgency") Integer idMotherAgency){
		Agency agencyRet = new Agency();
		agencyRet.setAddress(adress);
		agencyRet.setIdMotherAgency(idMotherAgency);
		agencyRet.setPhoneNum(phone);
		agencyRet.setType(type);
		entityManager.persist(agencyRet);
		entityManager.flush();
		return agencyRet;
	}
	
	@GET
	@Path("/edit/{id}/{type}/{adress}/{phone}/{idMotherAgency}")
	@Produces(MediaType.APPLICATION_JSON)
	public Agency editAgency (@PathParam("id") Integer id,
			@PathParam("type") String type,
			@PathParam("adress") String adress,
			@PathParam("phone") String phone,
			@PathParam("idMotherAgency") Integer idMotherAgency) {
		Agency agencyRet = entityManager.find(Agency.class, id);
		agencyRet.setAddress(adress);
		agencyRet.setIdMotherAgency(idMotherAgency);
		agencyRet.setPhoneNum(phone);
		agencyRet.setType(type);
		entityManager.merge(agencyRet);
		entityManager.flush();
		return agencyRet;
		
	}
	
	@GET
	@Path("/view/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Agency consultAgency (@PathParam("id") Integer id) {
		Agency agencyRet = entityManager.find(Agency.class, id);
		return agencyRet;
	}
	
	@GET
	@Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteAgency (@PathParam("id") Integer id) {
		Agency agencyRet = entityManager.find(Agency.class, id);
		entityManager.detach(agencyRet);
		entityManager.flush();
		return ("Agency successfully deleted");
	}

}
