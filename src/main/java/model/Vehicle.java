package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the VEHICLE database table.
 * 
 */
@Entity
@NamedQuery(name="Vehicle.findAll", query="SELECT v FROM Vehicle v")
public class Vehicle implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String brand;

	private String insurance;

	private float price;

	//bi-directional many-to-one association to Rent
	@OneToMany(mappedBy="vehicle")
	private List<Rent> rents;

	//bi-directional many-to-one association to Agency
	@ManyToOne
	@JoinColumn(name="idAgency")
	private Agency agency;

	//bi-directional many-to-one association to VehicleType
	@ManyToOne
	@JoinColumn(name="type")
	private VehicleType vehicleType;

	//bi-directional many-to-many association to Characteristic
	@ManyToMany
	@JoinTable(
		name="ASSIGN_CHARACTERISTIC"
		, joinColumns={
			@JoinColumn(name="idVehicle")
			}
		, inverseJoinColumns={
			@JoinColumn(name="idCharacteristic")
			}
		)
	private List<Characteristic> characteristics;

	public Vehicle() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBrand() {
		return this.brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getInsurance() {
		return this.insurance;
	}

	public void setInsurance(String insurance) {
		this.insurance = insurance;
	}

	public float getPrice() {
		return this.price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public List<Rent> getRents() {
		return this.rents;
	}

	public void setRents(List<Rent> rents) {
		this.rents = rents;
	}

	public Rent addRent(Rent rent) {
		getRents().add(rent);
		rent.setVehicle(this);

		return rent;
	}

	public Rent removeRent(Rent rent) {
		getRents().remove(rent);
		rent.setVehicle(null);

		return rent;
	}

	public Agency getAgency() {
		return this.agency;
	}

	public void setAgency(Agency agency) {
		this.agency = agency;
	}

	public VehicleType getVehicleType() {
		return this.vehicleType;
	}

	public void setVehicleType(VehicleType vehicleType) {
		this.vehicleType = vehicleType;
	}

	public List<Characteristic> getCharacteristics() {
		return this.characteristics;
	}

	public void setCharacteristics(List<Characteristic> characteristics) {
		this.characteristics = characteristics;
	}

}