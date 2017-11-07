package session;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import model.Vehicle;

/**
 * Session Bean implementation class QuerySession
 */
@Singleton
@LocalBean
public class QuerySession implements QuerySessionRemote {

	@PersistenceContext protected EntityManager em;
    /**
     * Default constructor. 
     */
    public QuerySession() {
        // TODO Auto-generated constructor stub
    }

	@Override
	public List<Vehicle> search(String[] parameters) {
		String s = "SELECT * FROM Vehicule";
		if(parameters.length>0){
		s += " WHERE ";
			for(int i=0;i<parameters.length;i++){
				s+= " Caracteristique='"+parameters[i]+"'";
				if(i<parameters.length-1) s+=" AND ";
			}
		}
		return (List<Vehicle>) em.createQuery(s)
		.getResultList();
	
		
	}

}
