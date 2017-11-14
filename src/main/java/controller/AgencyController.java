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
	
	@POST
	@Path("/create/agency")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Agency createAgency (@QueryParam("type") String type,
			@QueryParam("address") String address,
			@QueryParam("phone") String phone,
			@QueryParam("idMotherAgency") Integer idMotherAgency){
		Agency agencyRet = new Agency();
		System.out.println("DEBUG : " + type + " " + phone);
		agencyRet.setAddress(address);
		agencyRet.setIdMotherAgency(idMotherAgency);
		agencyRet.setPhoneNum(phone);
		agencyRet.setType(type);
		entityManager.persist(agencyRet);
		entityManager.flush();
		return agencyRet;
	}
	
	@POST
	@Path("/edit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Agency editAgency (@FormParam("id") Integer id,
			@FormParam("type") String type,
			@FormParam("adress") String adress,
			@FormParam("phone") String phone,
			@FormParam("idMotherAgency") Integer idMotherAgency) {
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
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteAgency (@FormParam("id") Integer id) {
		Agency agencyRet = entityManager.find(Agency.class, id);
		entityManager.detach(agencyRet);
		entityManager.flush();
		return ("Agency successfully deleted");
	}

}
