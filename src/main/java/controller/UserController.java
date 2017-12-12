package controller;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.*;

import JsonEncoders.JsonMessage;
import model.User;
import security.PasswordEncryption;

@Singleton
public class UserController extends Application {

	@PersistenceContext(unitName="myPU")
	private EntityManager entityManager;

	@Context private HttpServletRequest request;

	/**
	 * Create the user based on modelAgency
	 *
	 * @param modelUser The model of the user you want to create
	 * @return user the concrete user obtained
	 */
	public User createUser (User modelUser) {
		User newUser = new User(modelUser);
		newUser.setPassword(PasswordEncryption.generateHash(newUser.getPassword()));
		entityManager.persist(newUser);
		entityManager.flush();
		return newUser;
	}

	/**
	 * Update the user matching the modelUser
	 *
	 * @param modelUser The model of the user you want to update
	 * @return user the concrete user obtained
	 */
	public User updateUser (User modelUser) {

		User user = entityManager.find(User.class, modelUser.getId());

		String password = modelUser.getPassword();
		if(PasswordEncryption.generateHash(password) == user.getPassword()) {
			user.setMailAddress(modelUser.getMailAddress());
			user.setPassword(PasswordEncryption.generateHash(password));
			user.setPhoneNum(modelUser.getPhoneNum());
			user.setUserFirstName(modelUser.getUserFirstName());
			user.setUserName(modelUser.getUserName());
		}
		entityManager.merge(user);
		entityManager.flush();
		return user;
	}

	/**
	 * Update user identified by id. Verify current password and updates password if ok
	 * @param id
	 * @param oldPass
	 * @param newPass
	 * @return
	 */
	public User updateUserPass (int id, String oldPass, String newPass) {
		User u = entityManager.find(User.class, id);

		String password = oldPass;
		if(PasswordEncryption.generateHash(oldPass) == u.getPassword() ) {
			String password2 = newPass;
			String hashedPassword2 = PasswordEncryption.generateHash(password2);
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
	public JsonMessage disableUser(Integer userId) {
		User u = entityManager.find(User.class, userId);
		u.setStatus(false);
		entityManager.merge(u);
		entityManager.flush();
		return new JsonMessage("User successfully disabled");

	}

	/**
	 * Enable the user define by userId
	 *
	 * @param userId The id of the user you want to enable
	 * @return String A confirmation String
	 */
	public JsonMessage enableUser(Integer userId) {
		User u = entityManager.find(User.class, userId);
		u.setStatus(true);
		entityManager.merge(u);
		entityManager.flush();
		return (new JsonMessage("User successfully enabled"));
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


	/**
	 * Destroy user session
	 *
	 * @param httpHeaders the header to retrieve token
	 * @return Message or error
	 */
	public JsonMessage logout(HttpHeaders httpHeaders) {
		String token = httpHeaders.getHeaderString(HttpHeaders.AUTHORIZATION).substring("Bearer".length()).trim();
		User user = (User) entityManager.createQuery("FROM User WHERE token = :token")
				.setParameter("token", token)
				.getSingleResult();
		user.setToken(null);
		user.setTokenExpiration(null);
		entityManager.merge(user);
		entityManager.flush();
		request.getSession(false);
		return new JsonMessage("Déconnexion réussie");
	}

	/**
	 * Authenticate a user matching login + password
	 *
	 * @param login the login to test
	 * @param password the password to test
	 * @return the User identified or error
	 */
	public User authenticate(String login, String password) {
		String hashedPassword = PasswordEncryption.generateHash(password);
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
	
	/**
	 * 
	 * @return All the users on the database
	 */

	public List<User> getAllUsers(){
		return entityManager.createQuery("SELECT u From User u")
		.getResultList();
	}
	
}
