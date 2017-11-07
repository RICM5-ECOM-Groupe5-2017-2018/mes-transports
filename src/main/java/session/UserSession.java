package session;

import java.util.LinkedList;
import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import model.Rent;
import model.User;
import model.Vehicle;
import utils.CartItem;
import utils.SecurePass;

/**
 * Session Bean implementation class UserSession
 */
@Stateful
@LocalBean
public class UserSession implements UserSessionRemote {

	private static final Class<Object> User = null;
	@PersistenceContext protected EntityManager em;
	private User user;
	private List<CartItem> cart;
	private String token;
	
    /**
     * Default constructor. 
     */
    public UserSession() {
        cart = new LinkedList<CartItem>();
    }

	@Override
	public void initialize(String token) {
		// TODO change the way we access the user. We need a token.
		user = (User) em.find(User, token);
	}

	@Override
	public void connect(String username, String password) {

		user = (User) em.createQuery("SELECT * FROM user WHERE login = :user AND password = :pass")
		.setParameter("user", username)
		.setParameter("pass", SecurePass.secure(password))
		.getSingleResult();
		
	}

	@Override
	public void register(String username, String password, String email) {
		
		User user = new User();
		user.setLogin(username);
		user.setPassword(password);
		user.setMailAddress(email);
		
		em.getTransaction().begin();
		em.persist(user);
		em.getTransaction().commit();
		
	}

	@Override
	public void addItemToCart(List<Vehicle> item, long start_date, long end_date) {
		
		CartItem ci = new CartItem(item, start_date, end_date);
		cart.add(ci);
		
	}

	@Override
	public void removeItemFromCart(int id) {
		
		cart.remove(id);
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public void validateCart() {

		List<Boolean> validate_list = new LinkedList<Boolean>();
		
		for(int i=0;i<cart.size();i++){
			
			if((cart.get(i).start_date==0 && cart.get(i).end_date==0) || cart.get(i).vehicles.size()<=0){
				validate_list.add(true);
			}
			else{
				
				boolean list_validation=true;
				for(int j=0;j<cart.get(i).vehicles.size();j++){
					Vehicle v = cart.get(i).vehicles.get(j);
					String s="SELECT * FROM Vehicule WHERE id="+v.getId();
					//TODO RAJOUTER LES DISPONIBILITEE " INNER JOIN  ON Vehicule.id = disponibilite.id WHERE TODO
					
					;					
					List<Vehicle> vehicule_list=(List<Vehicle>) em.createQuery(s).getResultList();
					if(vehicule_list.size()==0){
						list_validation=false;
					}
				}
				if(list_validation){
					validate_list.add(true);
				}
				else{
					validate_list.add(false);
				}
			}
		}
		// TODO 
		
	}

	@Override
	public void emptyCart() {
		
		cart.clear();
		
	}

	@Override
	public List<CartItem> displayCart() {

		return cart;
		
	}

	@Override
	public List<Rent> displayRents() {
		
		return (List<Rent>) em.createQuery("SELECT * FROM rent WHERE idUser = :id")
		.setParameter("id", user.getId())
		.getResultList();
		
	}

}
