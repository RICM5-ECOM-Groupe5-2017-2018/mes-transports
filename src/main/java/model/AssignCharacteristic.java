package model;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Objects;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "assign_characteristic", catalog = "Mes_Transports")
public class AssignCharacteristic implements java.io.Serializable {
	
	@EmbeddedId
	private AssignCharacteristicId pk = new AssignCharacteristicId();
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "idVehicle", insertable = false, updatable = false)
	@JsonIgnore
	private Vehicle vehicle;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "idCharacteristic", insertable = false, updatable = false)
    private Characteristic characteristic;
	
	@Column(name = "valueCharacteristic", nullable = false)
	String valueCharacteristic ;

	public AssignCharacteristic() {
		super();
	}
	
	@JsonIgnore
	public AssignCharacteristicId getPk() {
		return pk;
	}

	public void setPk(AssignCharacteristicId pk) {
		this.pk = pk;
	}

	public String getValueCharacteristic() {
		return valueCharacteristic;
	}

	public void setValueCharacteristic(String valueCharacteristic) {
		this.valueCharacteristic = valueCharacteristic;
	}
	
	@JsonIgnore
	public Vehicle getIdVehicle() {
		return vehicle;
	}

	public void setIdVehicle(Vehicle idVehicle) {
		this.vehicle = idVehicle;
	}

	public Characteristic getIdCharacteristic() {
		return characteristic;
	}

	public void setIdCharacteristic(Characteristic idCharacteristic) {
		this.characteristic = idCharacteristic;
	}

	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        AssignCharacteristic that = (AssignCharacteristic) o;
        return Objects.equals(vehicle, that.vehicle) &&
               Objects.equals(characteristic, that.characteristic);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(vehicle, characteristic);
    }
	
}
