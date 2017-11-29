package model;
// Generated 11 nov. 2017 18:56:02 by Hibernate Tools 5.1.5.Final

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * User generated by hbm2java
 */
@Entity
@Table(name = "user", catalog = "Mes_Transports", uniqueConstraints = @UniqueConstraint(columnNames = "login"))
public class User implements java.io.Serializable {

	private Integer id;
	private String userName;
	private String userFirstName;
	private String role;
	private String mailAddress;
	private String login;
	private String password;
	private String phoneNum;
	private Integer idAgency;
	private String token;
	@OneToMany(targetEntity=Transaction.class, mappedBy="user", fetch=FetchType.LAZY)
	private List<Transaction> transactionList = new ArrayList<Transaction>();
	private Date tokenExpiration;
	private boolean status;

	public User() {
	}

	public User(String userName, String userFirstName, String role, String mailAddress, String login, String password,
			boolean status) {
		this.userName = userName;
		this.userFirstName = userFirstName;
		this.role = role;
		this.mailAddress = mailAddress;
		this.login = login;
		this.password = password;
		this.status = status;
	}

	public User(String userName, String userFirstName, String role, String mailAddress, String login, String password,
			String phoneNum, Integer idAgency, String token, Date tokenExpiration, boolean status) {
		this.userName = userName;
		this.userFirstName = userFirstName;
		this.role = role;
		this.mailAddress = mailAddress;
		this.login = login;
		this.password = password;
		this.phoneNum = phoneNum;
		this.idAgency = idAgency;
		this.token = token;
		this.tokenExpiration = tokenExpiration;
		this.status = status;
	}

	public User(User NewUser) {
		this.userName = NewUser.getUserName();
		this.userFirstName = NewUser.getUserFirstName();
		this.role = NewUser.getRole();
		this.mailAddress = NewUser.getMailAddress();
		this.login = NewUser.getLogin();
		this.password = NewUser.getPassword();
		this.phoneNum = NewUser.getPhoneNum();
		this.status = true;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "user_name", nullable = false, length = 50)
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "user_first_name", nullable = false, length = 50)
	public String getUserFirstName() {
		return this.userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	@Column(name = "role", nullable = false, length = 20)
	public String getRole() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Column(name = "mail_address", nullable = false, length = 100)
	public String getMailAddress() {
		return this.mailAddress;
	}

	public void setMailAddress(String mailAddress) {
		this.mailAddress = mailAddress;
	}

	@Column(name = "login", unique = true, nullable = false, length = 50)
	public String getLogin() {
		return this.login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	@Column(name = "password", nullable = false, length = 255)


	@JsonIgnore
	@JsonProperty(value = "password")
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "phone_num", length = 15)
	public String getPhoneNum() {
		return this.phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	@Column(name = "idAgency")
	public Integer getIdAgency() {
		return this.idAgency;
	}

	public void setIdAgency(Integer idAgency) {
		this.idAgency = idAgency;
	}

	@Column(name = "token", length = 50)
	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "token_expiration", length = 0)
	public Date getTokenExpiration() {
		return this.tokenExpiration;
	}

	public void setTokenExpiration(Date tokenExpiration) {
		this.tokenExpiration = tokenExpiration;
	}

	@Column(name = "status", nullable = false)
	public boolean isStatus() {
		return this.status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	@JsonIgnore
	@OneToMany(targetEntity=Transaction.class, mappedBy="user", fetch=FetchType.LAZY)
	public List<Transaction> getTransactionList() {
		return transactionList;
	}

	public void setTransactionList(List<Transaction> transactionList) {
		this.transactionList = transactionList;
	}
}
