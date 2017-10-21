package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the AGENCY database table.
 * 
 */
@Entity
@Table(name="AGENCY")
@NamedQuery(name="Agency.findAll", query="SELECT a FROM Agency a")
public class Agency implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String address;

	private String type;

	//bi-directional many-to-one association to User
	@OneToMany(mappedBy="agency")
	private List<User> users;

	//bi-directional many-to-one association to Vehicle
	@OneToMany(mappedBy="agency")
	private List<Vehicle> vehicles;

	//bi-directional many-to-one association to Agency
	@ManyToOne
	@JoinColumn(name="id_mother_agency")
	private Agency agency;

	//bi-directional many-to-one association to Agency
	@OneToMany(mappedBy="agency")
	private List<Agency> agencies;

	public Agency() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public User addUser(User user) {
		getUsers().add(user);
		user.setAgency(this);

		return user;
	}

	public User removeUser(User user) {
		getUsers().remove(user);
		user.setAgency(null);

		return user;
	}

	public List<Vehicle> getVehicles() {
		return this.vehicles;
	}

	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}

	public Vehicle addVehicle(Vehicle vehicle) {
		getVehicles().add(vehicle);
		vehicle.setAgency(this);

		return vehicle;
	}

	public Vehicle removeVehicle(Vehicle vehicle) {
		getVehicles().remove(vehicle);
		vehicle.setAgency(null);

		return vehicle;
	}

	public Agency getAgency() {
		return this.agency;
	}

	public void setAgency(Agency agency) {
		this.agency = agency;
	}

	public List<Agency> getAgencies() {
		return this.agencies;
	}

	public void setAgencies(List<Agency> agencies) {
		this.agencies = agencies;
	}

	public Agency addAgency(Agency agency) {
		getAgencies().add(agency);
		agency.setAgency(this);

		return agency;
	}

	public Agency removeAgency(Agency agency) {
		getAgencies().remove(agency);
		agency.setAgency(null);

		return agency;
	}

}