package session;

import javax.ejb.Remote;

import model.Vehicle;

@Remote
public interface AgencySessionRemote {

	public void createVehicle(Vehicle v);
	public void unregisterVehicle(Vehicle v);
	public void analytics(); // to develop later
	
}
