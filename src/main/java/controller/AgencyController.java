package controller;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import io.swagger.annotations.Api;
import model.Agency;
import security.Secured;
import security.SecuredAdmin;
import security.SecuredAgency;

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
	@SecuredAgency
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Agency createAgency (@QueryParam("type") String type,
			@QueryParam("address") String address,
			@QueryParam("phone") String phone,
			@QueryParam("idMotherAgency") Integer idMotherAgency){
		Agency agencyRet = new Agency();
		agencyRet.setAddress(address);
		agencyRet.setIdMotherAgency(idMotherAgency);
		agencyRet.setPhoneNum(phone);
		agencyRet.setType(type);		
		entityManager.persist(agencyRet);
		entityManager.flush();
		return agencyRet;
	}
	
	@POST
	@SecuredAgency
	@Path("/edit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Agency editAgency (@QueryParam("id") Integer id,
			@QueryParam("type") String type,
			@QueryParam("adress") String adress,
			@QueryParam("phone") String phone,
			@QueryParam("idMotherAgency") Integer idMotherAgency) {
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
	@SecuredAgency
	@Path("/view/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Agency consultAgency (@PathParam("id") Integer id) {
		Agency agencyRet = entityManager.find(Agency.class, id);
		return agencyRet;
	}
	
	@POST
	@SecuredAdmin
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/delete")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteAgency (@QueryParam("id") Integer id) {
		Agency agencyRet = entityManager.find(Agency.class, id);
		entityManager.detach(agencyRet);
		entityManager.flush();
		return ("Agency successfully deleted");
	}

}
