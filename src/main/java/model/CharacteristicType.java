package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the CHARACTERISTIC_TYPE database table.
 * 
 */
@Entity
@Table(name="CHARACTERISTIC_TYPE")
@NamedQuery(name="CharacteristicType.findAll", query="SELECT c FROM CharacteristicType c")
public class CharacteristicType implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private CharacteristicTypePK id;

	public CharacteristicType() {
	}

	public CharacteristicTypePK getId() {
		return this.id;
	}

	public void setId(CharacteristicTypePK id) {
		this.id = id;
	}

}