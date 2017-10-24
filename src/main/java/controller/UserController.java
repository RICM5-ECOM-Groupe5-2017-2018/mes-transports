package controller;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import model.User;

import java.util.List;

@Stateless
@ApplicationPath("/api")
@Path("test")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserController extends Application {
	
	@PersistenceContext
    private EntityManager entityManager;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public User gettest () {
		User userRet = new User();
		userRet.setUserName("coucou");
		return userRet;
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public User posttest () {
		User userRet = new User();
		userRet.setUserName("coucou");
		entityManager.persist(userRet);
		return userRet;
	}

}
