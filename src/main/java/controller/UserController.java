package controller;

import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.UUID;

import javax.ejb.EJBException;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;

import io.swagger.annotations.Api;
import model.User;
import session.UserSession;

@Stateless
@ApplicationPath("/api")
@Path("/user")
@Api("user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserController extends ApiController {
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
	
	@Context private HttpServletRequest request;
	
	@GET
	@Secured
	@Path("/logout")
	@Produces(MediaType.APPLICATION_JSON)
	public Response logout (@Context HttpHeaders httpHeaders) {
		try {
			String token = httpHeaders.getHeaderString(HttpHeaders.AUTHORIZATION).substring("Bearer".length()).trim();
			User user = (User) entityManager.createQuery("FROM User WHERE token = :token")
					.setParameter("token", token)
					.getSingleResult();
			user.setToken(null);
			user.setTokenExpiration(null);
			entityManager.merge(user);
			entityManager.flush();
			request.getSession(false);
			String json = "logout successfull";
			return Response.ok(json, MediaType.APPLICATION_JSON).build();	
		} catch (javax.persistence.NoResultException ex) {
			return Response.status(Response.Status.FORBIDDEN).build();
		} catch (Exception ex) {
			return Response.status(Response.Status.FORBIDDEN).build(); 
		}
	}
	
	@GET
	@Path("/authenticate/{login}/{password}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticate (@PathParam("login") String login,
			@PathParam("password") String password) {
		
		try {
			User user = (User) entityManager.createQuery("FROM User WHERE login = :user AND password = :pass")
					.setParameter("user", login)
					.setParameter("pass", password)
					.getSingleResult();
			request.getSession(true);
			Date date = new Date();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.DATE, 2);
			date = calendar.getTime();
			user.setTokenExpiration(date);
			String token = UUID.randomUUID().toString();
			user.setToken(token);
			request.getSession().setAttribute("token", token);
			String json = token;
			entityManager.merge(user);
			entityManager.flush();
			return Response.ok(json, MediaType.APPLICATION_JSON).build();	
		}catch (javax.persistence.NoResultException ex) {
			return Response.status(401).build();
		}
		
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	public User createUser (@FormParam("login") String login,
			@FormParam("username") String username,
			@FormParam("password") String password,
			@FormParam("mail") String mail,
			@FormParam("phone") String phone,
			@FormParam("role") String role,
			@FormParam("firstname") String firstname,
			@FormParam("lastname") String lastname) {
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
	
	@POST
	@Secured
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/edit")
	@Produces(MediaType.APPLICATION_JSON)
	public User editUser (@QueryParam("id") Integer id,
			@QueryParam("login") String login,
			@QueryParam("username") String username,
			@QueryParam("password") String password,
			@QueryParam("mail") String mail,
			@QueryParam("phone") String phone,
			@QueryParam("role") String role,
			@QueryParam("firstname") String firstname,
			@QueryParam("lastname") String lastname,
			@QueryParam("agencyId") Integer agencyId) {
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
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/disable")
	@Produces(MediaType.APPLICATION_JSON)
	public String disableUser (@QueryParam("id") Integer id) {
		User userRet = entityManager.find(User.class, id);
		userRet.setStatus(false);
		entityManager.merge(userRet);
		entityManager.flush();
		return ("User successfully disabled");
	}

}
