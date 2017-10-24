package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the CHARACTERISTIC database table.
 * 
 */
@Entity
@NamedQuery(name="Characteristic.findAll", query="SELECT c FROM Characteristic c")
public class Characteristic implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String label;

	private String unit;

	//bi-directional many-to-many association to VehicleType
	@ManyToMany(mappedBy="characteristics")
	private List<VehicleType> vehicleTypes;

	//bi-directional many-to-many association to Vehicle
	@ManyToMany(mappedBy="characteristics")
	private List<Vehicle> vehicles;

	public Characteristic() {
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

	public String getUnit() {
		return this.unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public List<VehicleType> getVehicleTypes() {
		return this.vehicleTypes;
	}

	public void setVehicleTypes(List<VehicleType> vehicleTypes) {
		this.vehicleTypes = vehicleTypes;
	}

	public List<Vehicle> getVehicles() {
		return this.vehicles;
	}

	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}

}