package session;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;

/**
 * Session Bean implementation class TaxiAgency
 */
@Stateful
@LocalBean
public class TaxiAgency extends UserSession implements TaxiAgencyRemote {

	//private List<Taxi> taxis;
	
    /**
     * Default constructor. 
     */
    public TaxiAgency() {
        // TODO Auto-generated constructor stub
    }

	@Override
	public void affectTaxi() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void getTaxis() {
		// TODO Auto-generated method stub
		
	}

}
