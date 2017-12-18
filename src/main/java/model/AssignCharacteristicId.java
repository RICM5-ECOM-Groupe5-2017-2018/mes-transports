package model;

import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Embeddable
public class AssignCharacteristicId implements java.io.Serializable {
	
	@Column(name="idVehicle")
	private int vehicle_pk;
	
	@Column(name="idCharacteristic")
    private int characteristic_pk;
	
	public AssignCharacteristicId() {
	}

	public AssignCharacteristicId(int vehicle_pk, int characteristic_pk) {
		this.vehicle_pk = vehicle_pk;
		this.characteristic_pk = characteristic_pk;
	}
	
	public int getIdVehicle() {
		return vehicle_pk;
	}
	public void setIdVehicle(int idVehicle) {
		this.vehicle_pk = idVehicle;
	}
	
	public int getIdCharacteristic() {
		return characteristic_pk;
	}
	public void setIdCharacteristic(int idCharacteristic) {
		this.characteristic_pk = idCharacteristic;
	}
	
	@Override
	public boolean equals(Object o) {
        
		if (this == o){ return true;}
        if (o == null || getClass() != o.getClass()){ return false;}

        AssignCharacteristicId objet = (AssignCharacteristicId) o;

        return Objects.equals(vehicle_pk, objet.vehicle_pk) && Objects.equals(characteristic_pk, objet.characteristic_pk);

    }

	@Override
    public int hashCode() {
		return Objects.hash(vehicle_pk, characteristic_pk);
    }
    
    
}