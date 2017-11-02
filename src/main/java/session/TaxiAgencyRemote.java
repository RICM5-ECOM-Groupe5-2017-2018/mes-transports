package session;

import javax.ejb.Remote;

@Remote
public interface TaxiAgencyRemote {

	public void affectTaxi();
	public void getTaxis();
	
}
