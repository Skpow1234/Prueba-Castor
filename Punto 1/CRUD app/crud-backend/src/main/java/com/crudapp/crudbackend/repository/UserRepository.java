package com.crudapp.crudbackend.repository;

import com.crudapp.crudbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
