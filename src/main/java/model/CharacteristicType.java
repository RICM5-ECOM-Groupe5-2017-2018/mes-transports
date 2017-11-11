package model;
// Generated 11 nov. 2017 18:56:02 by Hibernate Tools 5.1.5.Final

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * CharacteristicType generated by hbm2java
 */
@Entity
@Table(name = "characteristic_type", catalog = "Mes_Transports")
public class CharacteristicType implements java.io.Serializable {

	private CharacteristicTypeId id;

	public CharacteristicType() {
	}

	public CharacteristicType(CharacteristicTypeId id) {
		this.id = id;
	}

	@EmbeddedId

	@AttributeOverrides({ @AttributeOverride(name = "idType", column = @Column(name = "idType", nullable = false)),
			@AttributeOverride(name = "idCharacteristic", column = @Column(name = "idCharacteristic", nullable = false)) })
	public CharacteristicTypeId getId() {
		return this.id;
	}

	public void setId(CharacteristicTypeId id) {
		this.id = id;
	}

}
