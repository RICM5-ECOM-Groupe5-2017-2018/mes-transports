package controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;
import java.util.Date;

import java.util.UUID;

import javax.ejb.Singleton;
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
import model.Agency;
import model.User;
import security.Secured;
import security.SecuredAdmin;


@Singleton
public class UserController extends Application {
	
	@PersistenceContext(unitName="myPU")
    private EntityManager entityManager;
	
	@Context private HttpServletRequest request;
	
	public static final String SALT = "MTsalt";
	
	/**
	 * Create the user based on modelAgency
	 *
	 * @param modelUser The model of the user you want to create
	 * @return user the concrete user obtained
	 */
	public User createUser (User modelUser) {
		User NewUser = new User(modelUser);
		String password = NewUser.getPassword();
		String saltedPassword = SALT + password;
		String hashedPassword = generateHash(saltedPassword);
		NewUser.setPassword(hashedPassword);
		entityManager.persist(NewUser);
		entityManager.flush();
		return NewUser;
	}
	
	/**
	 * Update the user matching the modelUser
	 *
	 * @param modelUser The model of the user you want to update
	 * @return user the concrete user obtained
	 */
	public User updateUser (User modelUser) {
		
		User user = entityManager.find(User.class, modelUser.getId());
		
		String password = user.getPassword();
		String saltedPassword = SALT + password;
		String hashedPassword = generateHash(saltedPassword);
		if(hashedPassword == user.getPassword()) {
			user.setMailAddress(modelUser.getMailAddress());
			user.setPassword(hashedPassword);
			user.setPhoneNum(modelUser.getPhoneNum());
			user.setUserFirstName(modelUser.getUserFirstName());
			user.setUserName(modelUser.getUserName());
		}		
		entityManager.merge(user);
		entityManager.flush();
		return user;
	}
	
	
public User updateUserPass (int id,String oldPass, String newPass) {
		User u = entityManager.find(User.class, id);
		
		String password = oldPass;
		String saltedPassword = SALT + password;
		String hashedPassword = generateHash(saltedPassword);
		if(hashedPassword == u.getPassword() ) {
			String password2 = newPass;
			String saltedPassword2 = SALT + password2;
			String hashedPassword2 = generateHash(saltedPassword2);
			u.setPassword(hashedPassword2);
			entityManager.merge(u);
			entityManager.flush();
		}		
		return u;
	}
	/**
	 * Disable the user define by userId
	 * 
	 * @param userId The id of the user you want to disable
	 * @return String A confirmation String
	 */
	public String disableUser(Integer userId) {
		User u = entityManager.find(User.class, userId);
		u.setStatus(false);
		entityManager.merge(u);
		entityManager.flush();
		return "User successfully disabled";
		
	}
	
	/**
	 * Enable the user define by userId
	 * 
	 * @param userId The id of the user you want to enable
	 * @return String A confirmation String
	 */
	public String enableUser(Integer userId) {
		User u = entityManager.find(User.class, userId);
		u.setStatus(true);
		entityManager.merge(u);
		entityManager.flush();
		return "User successfully enabled";
	}
	
	/**
	 * send user informations
	 * 
	 * @param userId The id of the user you want to see
	 * @return user The user you want to get information about
	 */
	public User viewUser(Integer userId) {
		return entityManager.find(User.class, userId);	
	}
	
	
	public User logout(HttpHeaders httpHeaders) {
		String token = httpHeaders.getHeaderString(HttpHeaders.AUTHORIZATION).substring("Bearer".length()).trim();
		User user = (User) entityManager.createQuery("FROM User WHERE token = :token")
				.setParameter("token", token)
				.getSingleResult();
		user.setToken(null);
		user.setTokenExpiration(null);
		entityManager.merge(user);
		entityManager.flush();
		request.getSession(false);
		return user;
	}
	
	public User authenticate(String login, String password) {
			System.out.println("dis moi pourquoi tu plantes :(");
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
			return user;
	}
	
	/*@GET
	@Secured
	@Path("/logout")
	@ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "User token", required = true, dataType = "string", paramType = "header")})
	@Produces(MediaType.APPLICATION_JSON)
	public User logoutold (@Context HttpHeaders httpHeaders) {
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
			return user;
	}*/
	
	@GET
	@Path("/authenticate/{login}/{password}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticate2 (@PathParam("login") String login,
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

}
