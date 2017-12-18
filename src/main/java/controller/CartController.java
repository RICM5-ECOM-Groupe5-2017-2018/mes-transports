package controller;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;

import jsonencoders.JsonMessage;
import model.Agency;
import model.CartItem;
import model.User;
import model.Transaction;
import model.Rent;
import model.Vehicle;

import java.util.Comparator;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Singleton
public class CartController extends Application{
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
	
	public List<CartItem> getCart (Integer userId){
		Query q = entityManager.createQuery("FROM CartItem WHERE idUser= :userId")
		.setParameter("userId", userId);
		return q.getResultList();
	}
	

	public JsonMessage addToCart(CartItem modelItem) {
		CartItem c = new CartItem(modelItem);
		entityManager.merge(c);
		entityManager.flush();
		return new JsonMessage("Item added to cart");
	}
	
	public JsonMessage deleteFromCart(@QueryParam("id") Integer id) {
		CartItem ci = entityManager.find(CartItem.class, id);
		System.out.println("id :" + id + " idGet :"+ci.getId());
		entityManager.remove(ci);
		return new JsonMessage("CartItem deleted successfully");
	}
	
	public JsonMessage declareDone(List<CartItem> cart) {
		for(int i=0;i<cart.size();i++) {
			CartItem ci = cart.get(i);
			List<Rent> lr = entityManager.createQuery("SELECT r FROM Rent r WHERE r.idVehicle=:id AND ( ( :dateS BETWEEN r.startDate AND r.endDate ) OR ( :dateE BETWEEN r.startDate AND r.endDate ) )")
				.setParameter("id", ci.getIdVehicle())
				.setParameter("dateS", ci.getStartDate())
				.setParameter("dateE", ci.getEndDate())
				.getResultList();
			if(lr.size()>0) {
				System.out.println(lr.get(0).getStartDate() + " < " + ci.getStartDate() + ci.getEndDate());
				return new JsonMessage("Vehicule déjà réservé pour cette date, Cart rejeté");
			}
		}
		
		cart.sort(new Comparator<CartItem>() {
			@Override
			public int compare(CartItem arg0, CartItem arg1) {
				return ((arg0.getEndDate().before(arg1.getEndDate()))?0:1);
			}
		});
		
		List<Rent> lr = new LinkedList<Rent>();
		List<Integer> agencyId = new LinkedList<Integer>();
		List<Float> sommeList = new LinkedList<Float>();
		
		for(int i=0;i<cart.size();i++) {
			CartItem ci = cart.get(i);
			Rent r = new Rent(ci.getIdUser(),ci.getIdVehicle(),ci.getTotalPrice(),ci.getStartDate(),ci.getEndDate());
			lr.add(r);
			int id = (entityManager.find(Vehicle.class, ci.getIdVehicle())).getIdAgency();
			
			int j = agencyId.indexOf(id);
			if(j==-1) {
				agencyId.add(id);
				sommeList.add(ci.getTotalPrice());
			}
			else {
				sommeList.set(id, sommeList.get(id)+ci.getTotalPrice());
			}
			
		}
		
		List<Transaction> tl = new LinkedList<Transaction>();
		for(int i=0;i<agencyId.size();i++) {
			model.Transaction t = new model.Transaction();
			t.setUser(entityManager.find(User.class, cart.get(0).getIdUser()));
			t.setAgency(entityManager.find(Agency.class, agencyId.get(i)));
			t.setBankName("empty");
			t.setDescription("empty");
			t.setRib("empty");
			t.setAmount(sommeList.get(i));
			t.setDate(new Date());
			t.generateToken();
			tl.add(t);
		}
		
		for(int i=0;i<tl.size();i++) {
			entityManager.persist(tl.get(i));
		}
		for(int i=0;i<lr.size();i++) {
			entityManager.persist(lr.get(i));
		}
		entityManager.flush();
		
		
	return new JsonMessage("Cart validated");	
	}
}
