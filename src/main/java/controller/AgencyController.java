package controller;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import model.Agency;
import model.Vehicle;
import security.SecuredAdmin;
import security.SecuredAgency;

@Stateless
@ApplicationPath("/api")
@Path("/agency")
@Api("agency")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AgencyController extends Application {
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
	
	@POST
	@SecuredAgency
	@Path("/create")
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
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
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
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
	
	@POST
	@SecuredAgency
	@Path("/view")
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Agency consultAgency (@QueryParam("id") Integer id) {
		Agency agencyRet = entityManager.find(Agency.class, id);
		return agencyRet;
	}
	
	@POST
	@SecuredAdmin
	@Path("/delete")
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteAgency (@QueryParam("id") Integer id) {
		Agency agencyRet = entityManager.find(Agency.class, id);
		entityManager.detach(agencyRet);
		entityManager.flush();
		return ("Agency successfully deleted");
	}
	
	@POST
	@SecuredAgency
	@Path("/vehicle")
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Vehicle> View_Vehicles (@QueryParam("id") Integer id) {
		Query q = entityManager.createQuery("SELECT * FROM Vehicle WHERE idAgency="+id);
		return ((List<Vehicle>)q.getResultList());
	}
	
	@POST
	@SecuredAgency
	@Path("/list")
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Vehicle> View_Agency (@FormParam("id") Integer id) {
		Query q = entityManager.createQuery("FROM Agency WHERE id_mother_agency="+id);
		return ((List<Vehicle>)q.getResultList());
	}

}
