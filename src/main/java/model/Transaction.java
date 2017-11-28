package model;
// Generated 11 nov. 2017 18:56:02 by Hibernate Tools 5.1.5.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transaction", catalog = "Mes_Transports")
public class Transaction implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    @Column(name = "user", nullable = false)
    private User user;
    @Column(name = "agency", nullable = false)
    private Agency agency;
    @Column(name = "amount", nullable = false)
    private Float amount;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "bankName", nullable = false)
    private String bankName;
    @Column(name = "rib", nullable = false)
    private String rib;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
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

}
