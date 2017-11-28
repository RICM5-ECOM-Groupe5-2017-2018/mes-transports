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
import javax.ws.rs.core.*;

//this is just a comment to test autodeploy
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import model.User;
import security.Secured;
import security.SecuredAdmin;


@Stateless
@ApplicationPath("/api")
@Path("/user")
@Api("user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserController extends Application {
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
	
	@Context private HttpServletRequest request;
	
	public static final String SALT = "MTsalt";
	
	@GET
	@Secured
	@Path("/logout")
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
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
			NewCookie cookie = new NewCookie("Bearer", token);
			entityManager.merge(user);
			entityManager.flush();
			return Response.ok(user, MediaType.APPLICATION_JSON).build();
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

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	public User createUser (User userQuery) {
		User userRet = new User();
		String saltedPassword = SALT + userQuery.getPassword();
		String hashedPassword = generateHash(saltedPassword);
		userRet.setUserName(userQuery.getUserName());
		userRet.setLogin(userQuery.getLogin());
		userRet.setMailAddress(userQuery.getMailAddress());
		userRet.setPassword(hashedPassword);
		userRet.setPhoneNum(userQuery.getPhoneNum());
		userRet.setRole(userQuery.getRole());
		userRet.setUserFirstName(userQuery.getUserFirstName());
		userRet.setUserName(userQuery.getUserName());
		userRet.setStatus(true);
		entityManager.persist(userRet);
		entityManager.flush();
		return userRet;

	}

	@POST
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
			@QueryParam("lastname") String lastname){
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

	@POST
	@Secured
	@Path("/view")
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User consultUser (@QueryParam("id") Integer id) {
		User userRet = entityManager.find(User.class, id);
		return userRet;
	}
	
	@POST
	@SecuredAdmin
	@Path("/disable")
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String disableUser (@QueryParam("id") Integer id) {
		User userRet = entityManager.find(User.class, id);
		userRet.setStatus(false);
		entityManager.merge(userRet);
		entityManager.flush();
		return ("User successfully disabled");
	}

	@POST
	@SecuredAdmin
	@Path("/reactivate")
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
	@Produces(MediaType.APPLICATION_JSON)
	public String enableUser (@QueryParam("id") Integer id) {
		User userRet = entityManager.find(User.class, id);
		userRet.setStatus(true);
		entityManager.merge(userRet);
		entityManager.flush();
		return ("User successfully enabled");
	}

}
