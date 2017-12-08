package controller;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
//import javax.transaction.Transaction;

import JsonEncoders.JsonMessage;
import model.Agency;
import model.Rent;
import model.Vehicle;
import model.Transaction;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Singleton
public class AgencyController {

	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;

	/**
	 * Create the agency based on modelAgency
	 *
	 * @param modelAgency The model of the agency you want to create
	 * @return agency the concrete agency obtained
	 */
	public Agency createAgency (Agency modelAgency) {
		Agency newAgency = new Agency(modelAgency);
		entityManager.persist(newAgency);
		entityManager.flush();
		return newAgency;
	}

	/**
	 * Get the rents list from all the vehicles for the Agency defined by agencyId from start_date to end_date
	 * 
	 * @param agencyId
	 * @param start_date
	 * @param end_date
	 * @return
	 */
	public List<Rent> getRents(Integer agencyId,String start_date, String end_date){
		List<Vehicle> lv = entityManager.createQuery("Select v FROM Vehicle v WHERE v.idAgency=:id")
		.setParameter("id", agencyId)
		.getResultList();
		
		List<Rent> all_rents = new LinkedList<Rent>();		
		for(int i=0;i<lv.size();i++) {
			List<Rent> lr=entityManager.createQuery("SELECT r FROM Rent r WHERE r.idVehicle=:id")
			.setParameter("id", lv.get(i).getId())
			.getResultList();
			for(int j=0;j<lr.size();j++) {
				all_rents.add(lr.get(j));
			}
		}
		
		for(int i=0;i<all_rents.size();i++) {
			
			if(entityManager.createQuery("SELECT t FROM Transaction t WHERE t.id=:idT AND t.str_date BETWEEN '"+start_date+ "' AND '"+end_date+"'")
			.setParameter("idT", all_rents.get(i).getTransaction().getId())
			.getResultList().size()<=0) {
				all_rents.remove(i);
				i--;
			}
		}
		
		return all_rents;
	}

	/**
     * Get the transaction list from all the vehicles for the Agency defined by agencyId from start_date to end_date
     *
     * @param agencyId
     * @param start_date
     * @param end_date
     * @return
     */
    public List<Transaction> getTransactions(Integer agencyId, String start_date, String end_date){
		return entityManager.createQuery("Select t FROM Transaction t WHERE t.agency.id=:id AND t.str_date BETWEEN '"+start_date+"' AND '" + end_date + "'")
		.setParameter("id", agencyId)
		.getResultList();
	}
	
	
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
	public JsonMessage deleteAgency (Integer idAgency) {
		Agency agencyRet = entityManager.find(Agency.class, idAgency);
		agencyRet.setStatus(false);
		entityManager.merge(agencyRet);
		entityManager.flush();
		return new JsonMessage("Agency successfully deleted");
	}

	/**
	 * Enable the agency matching idAgency
	 *
	 * @param idAgency the id of the agency to manipulate
	 * @return message
	 */
	public JsonMessage activateAgency (Integer idAgency) {
		Agency agencyRet = entityManager.find(Agency.class, idAgency);
		agencyRet.setStatus(true);
		entityManager.merge(agencyRet);
		entityManager.flush();
		return new JsonMessage("Agency successfully activated");
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
		Query q = entityManager.createQuery("FROM Vehicle WHERE idAgency in (SELECT id FROM Agency WHERE id_mother_agency=:idAgency OR id=:idAgency)")
				.setParameter("idAgency", idAgency);
		return ((List<Vehicle>)q.getResultList());
	}

	/**
	 * UNKNOWN
	 *
	 * @param idAgency the id of the agency
	 * @return UNKNOWN
	 */
	public List<Agency> getChildAgencies (Integer idAgency) {
		Query q = entityManager.createQuery("FROM Agency WHERE id_mother_agency="+idAgency);
		return ((List<Agency>)q.getResultList());
	}

}
