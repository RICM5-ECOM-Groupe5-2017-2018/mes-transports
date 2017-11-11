package controller;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import model.User;

@Stateless
@ApplicationPath("/api")
@Path("/user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserController extends ApiController {
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
	
	@GET
	@Path("/create/{login}/{username}/{password}/{mail}/{phone}/{role}/{firstname}/{lastname}")
	@Produces(MediaType.APPLICATION_JSON)
	public User createUser (@PathParam("login") String login,
			@PathParam("username") String username,
			@PathParam("password") String password,
			@PathParam("mail") String mail,
			@PathParam("phone") String phone,
			@PathParam("role") String role,
			@PathParam("firstname") String firstname,
			@PathParam("lastname") String lastname) {
		User userRet = new User();
		userRet.setUserName(username);
		userRet.setLogin(login);
		userRet.setMailAddress(mail);
		userRet.setPassword(password);
		userRet.setPhoneNum(phone);
		userRet.setRole(role);
		userRet.setUserFirstName(firstname);
		userRet.setUserName(lastname);
		userRet.setStatus(true);
		entityManager.persist(userRet);
		entityManager.flush();
		return userRet;
		
	}
	
	@GET
	@Path("/edit/{id}/{login}/{username}/{password}/{mail}/{phone}/{role}/{firstname}/{lastname}/{agencyId}")
	@Produces(MediaType.APPLICATION_JSON)
	public User editUser (@PathParam("id") Integer id,
			@PathParam("login") String login,
			@PathParam("username") String username,
			@PathParam("password") String password,
			@PathParam("mail") String mail,
			@PathParam("phone") String phone,
			@PathParam("role") String role,
			@PathParam("firstname") String firstname,
			@PathParam("lastname") String lastname,
			@PathParam("agencyId") Integer agencyId) {
		User userRet = entityManager.find(User.class, id);
		userRet.setUserName(username);
		userRet.setLogin(login);
		userRet.setMailAddress(mail);
		userRet.setPassword(password);
		userRet.setPhoneNum(phone);
		userRet.setRole(role);
		userRet.setUserFirstName(firstname);
		userRet.setUserName(lastname);
		userRet.setStatus(true);
		entityManager.merge(userRet);
		entityManager.flush();
		return userRet;
		
	}
	
	@GET
	@Path("/view/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User consultUser (@PathParam("id") Integer id) {
		User userRet = entityManager.find(User.class, id);
		return userRet;
	}
	
	@GET
	@Path("/disable/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String disableUser (@PathParam("id") Integer id) {
		User userRet = entityManager.find(User.class, id);
		userRet.setStatus(false);
		entityManager.merge(userRet);
		entityManager.flush();
		return ("User successfully disabled");
	}

}
