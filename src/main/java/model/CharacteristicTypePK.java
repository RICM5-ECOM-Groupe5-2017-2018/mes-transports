package model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the CHARACTERISTIC_TYPE database table.
 * 
 */
@Embeddable
public class CharacteristicTypePK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	private int idType;

	private int idCharacteristic;

	public CharacteristicTypePK() {
	}
	public int getIdType() {
		return this.idType;
	}
	public void setIdType(int idType) {
		this.idType = idType;
	}
	public int getIdCharacteristic() {
		return this.idCharacteristic;
	}
	public void setIdCharacteristic(int idCharacteristic) {
		this.idCharacteristic = idCharacteristic;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof CharacteristicTypePK)) {
			return false;
		}
		CharacteristicTypePK castOther = (CharacteristicTypePK)other;
		return 
			(this.idType == castOther.idType)
			&& (this.idCharacteristic == castOther.idCharacteristic);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.idType;
		hash = hash * prime + this.idCharacteristic;
		
		return hash;
	}
}