package session;

import java.util.List;

import javax.ejb.Remote;

import model.Vehicle;

@Remote
public interface QuerySessionRemote {

	public List<Vehicle> search(String[] parameters);
	
}
