package com.atm.expensewise.dao;

import com.atm.expensewise.models.Income;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "income", path = "income")
public interface IncomeRepo extends MongoRepository<Income, String> {
}
