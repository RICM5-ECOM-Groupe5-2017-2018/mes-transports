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
		string s = "SELECT * FROM Vehicule";
		if(parameters.size()>0){
		s += " WHERE ";
			for(int i=0;i<parameters.size();i++){
				s+= " Caracteristique='"+parameters.get(i)+"'";
				if(i<parameters.size()-1) s+=" AND ";
			}
		}
		(List<Vehicule>) em.createQuery(s)
		.getResultList();
		
		return null;
		
	}

}
