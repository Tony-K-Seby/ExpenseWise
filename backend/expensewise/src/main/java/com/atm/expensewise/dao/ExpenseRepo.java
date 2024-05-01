package com.atm.expensewise.dao;

import com.atm.expensewise.models.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "expense", path = "expense")
public interface ExpenseRepo extends MongoRepository<Expense, String> {
}
