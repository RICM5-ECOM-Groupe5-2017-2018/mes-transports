package session;

import java.util.List;

import javax.ejb.Remote;

import model.Rent;
import model.Vehicle;
import utils.CartItem;

@Remote
public interface UserSessionRemote {

	public void initialize(String token);
	public void connect(String username, String password);
	public void register(String username, String password, String email);
	public void addItemToCart(List<Vehicle> item, long start_date, long end_date);
	public void removeItemFromCart(int id);
	public void validateCart();
	public void emptyCart();
	public List<CartItem> displayCart();
	public List<Rent> displayRents();
	
}
