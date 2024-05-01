package com.atm.expensewise.dao;

import com.atm.expensewise.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface UserRepo extends MongoRepository<User, String> {
    User findByEmail(String email);
}
