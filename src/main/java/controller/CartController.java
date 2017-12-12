package controller;

import javax.ejb.EJBTransactionRolledbackException;
import javax.ejb.Singleton;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import JsonEncoders.JsonMessage;
import io.swagger.annotations.Api;
import model.Agency;
import model.CartItem;
import model.Characteristic;
import model.CharacteristicType;
import model.Vehicle;

import java.util.ArrayList;
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
}
