package session;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Singleton;

import model.Vehicle;

/**
 * Session Bean implementation class QuerySession
 */
@Singleton
@LocalBean
public class QuerySession implements QuerySessionRemote {

    /**
     * Default constructor. 
     */
    public QuerySession() {
        // TODO Auto-generated constructor stub
    }

	@Override
	public List<Vehicle> search(String[] parameters) {

		//TODO
		return null;
		
	}

}
