package controller;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.core.Application;

import model.Agency;
import model.Vehicle;

import java.util.List;

@Singleton
public class AgencyController extends Application {
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
<<<<<<< HEAD
	
	@POST
	//@SecuredAgency
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Agency createAgency (@QueryParam("type") String type,
			@QueryParam("address") String address,
			@QueryParam("phoneNum") String phone,
			@QueryParam("idMotherAgency") Integer idMotherAgency){
		Agency agencyRet = new Agency();
		agencyRet.setAddress(address);
		agencyRet.setIdMotherAgency(idMotherAgency);
		agencyRet.setPhoneNum(phone);
		agencyRet.setType(type);		
		entityManager.persist(agencyRet);
=======

	/**
	 * Createsthe agency based on modelAgency
	 *
	 * @param modelAgency The model of the agency you want to create
	 * @return agency the concrete agency obtained
	 */
	public Agency createAgency (Agency modelAgency) {
		Agency newAgency = new Agency (modelAgency);
		entityManager.persist(newAgency);
>>>>>>> dev-Mric
		entityManager.flush();
		return newAgency;
	}

<<<<<<< HEAD
	@POST
	//@SecuredAgency
	@Path("/edit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Agency editAgency (@QueryParam("id") Integer id,
			@QueryParam("type") String type,
			@QueryParam("adress") String adress,
			@QueryParam("phoneNum") String phone,
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
	//@SecuredAgency
	@Path("/view")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Agency consultAgency (@QueryParam("id") Integer id) {
		Agency agencyRet = entityManager.find(Agency.class, id);
		return agencyRet;
	}
	
	@POST
	//@SecuredAdmin
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/delete")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteAgency (@QueryParam("id") Integer id) {
		Agency agencyRet = entityManager.find(Agency.class, id);
		entityManager.detach(agencyRet);
		entityManager.flush();
		return ("Agency successfully deleted");
	}
	
	@POST
	//@SecuredAgency
	@Path("/vehicle")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Vehicle> View_Vehicles (@QueryParam("id") Integer id) {
		Query q = entityManager.createQuery("SELECT v FROM Vehicle v WHERE v.id LIKE :id")
				.setParameter("id", id);
		return ((List<Vehicle>)q.getResultList());
	}
	
	@POST
	//@SecuredAgency
	@Path("/list")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Vehicle> View_Agency (@QueryParam("id") Integer id) {
		Query q = entityManager.createQuery("SELECT v FROM Agency v WHERE v.idMotherAgency LIKE :id")
				.setParameter("id", id);
=======
	/**
	 * Update the agency matching the modelAgency
	 *
	 * @param modelAgency The model of the agency you wont to update
	 * @return agency the concrete agency obtained
	 */
	public Agency updateAgency (Agency modelAgency) {
		Agency agency = entityManager.find(Agency.class, modelAgency.getId());
		agency.setAddress(modelAgency.getAddress());
		agency.setBankLink(modelAgency.getBankLink());
		agency.setBankName(modelAgency.getBankName());
		agency.setCity(modelAgency.getCity());
		agency.setIdMotherAgency(modelAgency.getIdMotherAgency());
		agency.setPhoneNum(modelAgency.getPhoneNum());
		agency.setName(modelAgency.getName());
		agency.setRib(modelAgency.getRib());
		agency.setType(modelAgency.getType());
		entityManager.merge(agency);
		entityManager.flush();
		return agency;
	}

	/**
	 * Disable the agency matching idAgency
	 * IMPORTANT ! DO NOT DELETE THE ENTITY FOR LEGAL REASONS
	 *
	 * @param idAgency the id of the agency to manipulate
	 * @return message
	 */
	public String deleteAgency (Integer idAgency) {
		Agency agencyRet = entityManager.find(Agency.class, idAgency);
		agencyRet.setStatus(false);
		entityManager.merge(agencyRet);
		entityManager.flush();
		return ("Agency successfully deleted");
	}

	/**
	 * Enable the agency matching idAgency
	 *
	 * @param idAgency the id of the agency to manipulate
	 * @return message
	 */
	public String activateAgency (Integer idAgency) {
		Agency agencyRet = entityManager.find(Agency.class, idAgency);
		agencyRet.setStatus(true);
		entityManager.merge(agencyRet);
		entityManager.flush();
		return ("Agency successfully activated");
	}

	/**
	 * Returns the agency matching the id provided
	 *
	 * @param idAgency the id of the agency to manipulate
	 * @return the agency matching
	 */
	public Agency getAgency (Integer idAgency) {
		return (entityManager.find(Agency.class, idAgency));
	}

	/**
	 * Returns the list of vehicles of the agency matching idAgency
	 *
	 * @param idAgency the id of the agency
	 * @return the list of agency's vehicles
	 */
	public List<Vehicle> getAgencyVehicles (Integer idAgency) {
		Query q = entityManager.createQuery("SELECT * FROM VEHICLE WHERE idAgency="+idAgency);
		return ((List<Vehicle>)q.getResultList());
	}

	/**
	 * UNKNOWN
	 *
	 * @param idAgency the id of the agency
	 * @return UNKNOWN
	 */
	public List<Vehicle> getChildAgencies (Integer idAgency) {
		// Code douteux de la part de charles, à tester...
		Query q = entityManager.createQuery("SELECT * FROM AGENCY WHERE id_mother_agency="+idAgency);
>>>>>>> dev-Mric
		return ((List<Vehicle>)q.getResultList());
	}

}
