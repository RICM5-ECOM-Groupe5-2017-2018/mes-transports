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

	public Agency createAgency (Agency modelAgency) {
		Agency newAgency = new Agency (modelAgency);
		entityManager.persist(newAgency);
		entityManager.flush();
		return newAgency;
	}

	/**
	 * TODO : Vérifier comment faire les updates avec les put
	 */
	public Agency updateAgency (Agency agency) {
		entityManager.merge(agency);
		entityManager.flush();
		return agency;
	}

	public String deleteAgency (Integer idAgency) {
		Agency agencyRet = entityManager.find(Agency.class, idAgency);
		agencyRet.setStatus(false);
		entityManager.merge(agencyRet);
		entityManager.flush();
		return ("Agency successfully deleted");
	}

	public String activateAgency (Integer idAgency) {
		Agency agencyRet = entityManager.find(Agency.class, idAgency);
		agencyRet.setStatus(true);
		entityManager.merge(agencyRet);
		entityManager.flush();
		return ("Agency successfully activated");
	}

	public Agency getAgency (Integer idAgency) {
		return (entityManager.find(Agency.class, idAgency));
	}

	public List<Vehicle> getAgencyVehicles (Integer idAgency) {
		Query q = entityManager.createQuery("SELECT * FROM VEHICLE WHERE idAgency="+idAgency);
		return ((List<Vehicle>)q.getResultList());
	}

	public List<Vehicle> getChildAgencies (Integer idAgency) {
		// Code douteux de la part de charles, à tester...
		Query q = entityManager.createQuery("SELECT * FROM AGENCY WHERE id_mother_agency="+idAgency);
		return ((List<Vehicle>)q.getResultList());
	}

}
