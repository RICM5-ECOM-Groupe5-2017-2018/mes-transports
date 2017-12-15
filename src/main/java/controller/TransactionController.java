package controller;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import model.Transaction;

@Singleton
public class TransactionController {

	@PersistenceContext(unitName="myPU")
	private EntityManager entityManager;

	public Transaction get(Integer transactionId) {
		return entityManager.find(Transaction.class, transactionId);
	}
}
