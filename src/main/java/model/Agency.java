package model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "agency")
public class Agency implements java.io.Serializable {

	private Integer id;
	private String type;
	private String address;
	private Integer idMotherAgency;
	private String phoneNum;
	private String city;
	private String name;
	private String bankLink;
	private String bankName;
	private String rib;
	private Boolean status;
	@OneToMany(targetEntity=Transaction.class, mappedBy="agency", fetch=FetchType.LAZY)
	private List<Transaction> transactionList;

	public Agency() {
	}

	public Agency(String type, String address, String phoneNum) {
		this.type = type;
		this.address = address;
		this.phoneNum = phoneNum;
	}

	public Agency(String type, String address, Integer idMotherAgency, String phoneNum) {
		this.type = type;
		this.address = address;
		this.idMotherAgency = idMotherAgency;
		this.phoneNum = phoneNum;
	}

	public Agency(Agency modelAgency) {
		this.address = modelAgency.getAddress();
		this.bankLink = modelAgency.getBankLink();
		this.bankName = modelAgency.getBankName();
		this.city = modelAgency.getCity();
		this.idMotherAgency = modelAgency.getIdMotherAgency();
		this.phoneNum = modelAgency.getPhoneNum();
		this.name = modelAgency.getName();
		this.transactionList = modelAgency.getTransactionList();
		this.rib = modelAgency.getRib();
		this.type = modelAgency.getType();
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

	@Column(name = "type", nullable = false, length = 100)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "address", nullable = false)
	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(name = "id_mother_agency")
	public Integer getIdMotherAgency() {
		return this.idMotherAgency;
	}

	public void setIdMotherAgency(Integer idMotherAgency) {
		this.idMotherAgency = idMotherAgency;
	}

	@Column(name = "phone_num", nullable = false, length = 65535)
	public String getPhoneNum() {
		return this.phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBankLink() {
		return bankLink;
	}

	public void setBankLink(String bankLink) {
		this.bankLink = bankLink;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getRib() {
		return rib;
	}

	public void setRib(String rib) {
		this.rib = rib;
	}

	@JsonIgnore
	@OneToMany(targetEntity=Transaction.class, mappedBy="agency", fetch=FetchType.LAZY)
	public List<Transaction> getTransactionList() {
		return transactionList;
	}

	public void setTransactionList(List<Transaction> transactionList) {
		this.transactionList = transactionList;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
}
