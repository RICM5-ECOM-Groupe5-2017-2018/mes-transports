package controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

import io.swagger.annotations.Api;

import model.User;
import security.Secured;
import security.SecuredAgency;


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
	
	public static final String SALT = "MTsalt";
	
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
			String saltedPassword = SALT + password;
			String hashedPassword = generateHash(saltedPassword);
			User user = (User) entityManager.createQuery("FROM User WHERE login = :user AND password = :pass")
					.setParameter("user", login)
					.setParameter("pass", hashedPassword)
					.getSingleResult();
			request.getSession(true);
			Date date = new Date();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.DATE, 2);
			date = calendar.getTime();
			user.setTokenExpiration(date);
			String token = null;
			if (user.getToken() == null) {
				token = UUID.randomUUID().toString();
				user.setToken(token);
			} else {
				token = user.getToken();
			}
			request.getSession().setAttribute("token", token);
			String json = token;
			NewCookie cookie = new NewCookie("Bearer", token);
			entityManager.merge(user);
			entityManager.flush();
			return Response.ok(json, MediaType.APPLICATION_JSON).build();	
		}catch (javax.persistence.NoResultException ex) {
			return Response.status(401).build();
		}
		
	}
	
	private String generateHash(String input) {
		StringBuilder hash = new StringBuilder();

		try {
			MessageDigest sha = MessageDigest.getInstance("SHA-1");
			byte[] hashedBytes = sha.digest(input.getBytes());
			char[] digits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
					'a', 'b', 'c', 'd', 'e', 'f' };
			for (int idx = 0; idx < hashedBytes.length; ++idx) {
				byte b = hashedBytes[idx];
				hash.append(digits[(b & 0xf0) >> 4]);
				hash.append(digits[b & 0x0f]);
			}
		} catch (NoSuchAlgorithmException e) {
			// handle error here.
		}

		return hash.toString();
	}

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
		String saltedPassword = SALT + password;
		String hashedPassword = generateHash(saltedPassword);
		userRet.setUserName(username);
		userRet.setLogin(login);
		userRet.setMailAddress(mail);
		userRet.setPassword(hashedPassword);
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
	@Secured
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
		String saltedPassword = SALT + password;
		String hashedPassword = generateHash(saltedPassword);
		userRet.setPassword(hashedPassword);
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
	@SecuredAgency
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
