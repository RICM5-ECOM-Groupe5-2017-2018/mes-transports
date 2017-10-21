package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the VEHICLE_TYPE database table.
 * 
 */
@Entity
@Table(name="VEHICLE_TYPE")
@NamedQuery(name="VehicleType.findAll", query="SELECT v FROM VehicleType v")
public class VehicleType implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String label;

	//bi-directional many-to-one association to Vehicle
	@OneToMany(mappedBy="vehicleType")
	private List<Vehicle> vehicles;

	//bi-directional many-to-many association to Characteristic
	@ManyToMany
	@JoinTable(
		name="CHARACTERISTIC_TYPE"
		, joinColumns={
			@JoinColumn(name="idType")
			}
		, inverseJoinColumns={
			@JoinColumn(name="idCharacteristic")
			}
		)
	private List<Characteristic> characteristics;

	public VehicleType() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLabel() {
		return this.label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public List<Vehicle> getVehicles() {
		return this.vehicles;
	}

	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}

	public Vehicle addVehicle(Vehicle vehicle) {
		getVehicles().add(vehicle);
		vehicle.setVehicleType(this);

		return vehicle;
	}

	public Vehicle removeVehicle(Vehicle vehicle) {
		getVehicles().remove(vehicle);
		vehicle.setVehicleType(null);

		return vehicle;
	}

	public List<Characteristic> getCharacteristics() {
		return this.characteristics;
	}

	public void setCharacteristics(List<Characteristic> characteristics) {
		this.characteristics = characteristics;
	}

}