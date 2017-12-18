package model;
// Generated 11 nov. 2017 18:56:02 by Hibernate Tools 5.1.5.Final

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "transaction", catalog = "Mes_Transports")
public class Transaction implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    @Column(name = "amount", nullable = false)
    private Float amount;
    @Column(name = "description")
    private String description;
    @Column(name="str_date", nullable=false)
    private Date str_date;
    @Column(name = "bankName")
    private String bankName;
    @Column(name = "rib")
    private String rib;
    
    @OneToMany(targetEntity=Rent.class, mappedBy="transaction", fetch=FetchType.LAZY)
    @JsonIgnore
    private List<Rent> rentList = new ArrayList<Rent>();
    
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="agency_id")
    @JsonIgnore
    private Agency agency;
    
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;
    @JoinColumn(name="token", nullable = false)
    private String token;
    


    public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }
    
    public void setDate(Date date) {
    	str_date=date;
    }
    
    public Date getDate() {
    	return str_date;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
    public Agency getAgency() {
        return agency;
    }

    public void setAgency(Agency agency) {
        this.agency = agency;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    @OneToMany(targetEntity=Rent.class, mappedBy="transaction", fetch=FetchType.LAZY)
    public List<Rent> getRentList() {
        return rentList;
    }

    public void setRentList(List<Rent> rentList) {
        this.rentList = rentList;
    }
    
    public void generateToken() {
    	SecureRandom random = new SecureRandom();
    	byte bytes[] = new byte[20];
    	random.nextBytes(bytes);
    	token = Arrays.toString(bytes);
    }
}
