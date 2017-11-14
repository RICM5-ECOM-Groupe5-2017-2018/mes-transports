package session;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import model.Agency;
import model.Vehicle;

/**
 * Session Bean implementation class AgencySession
 */
@Stateful
@LocalBean
public class AgencySession extends UserSession implements AgencySessionRemote {
	
	@PersistenceContext(unitName="myPU")
	private EntityManager em;
	
	public List<Agency> agencies;

    /**
     * Default constructor. 
     */
    public AgencySession() {
        // TODO Auto-generated constructor stub
    }

	@Override
	public void createVehicle(Vehicle v) {

		em.getTransaction().begin();
		em.persist(v);
		em.getTransaction().commit();
		
	}

	@Override
	public void unregisterVehicle(Vehicle v) {
		
		// TODO add entry in database to be inactive
		
		em.getTransaction().begin();
		em.persist(v);
		em.getTransaction().commit();
		
	}

	@Override
	public void analytics() {
		
		// TODO create the right query in DB. To determine.
		
	}

}
