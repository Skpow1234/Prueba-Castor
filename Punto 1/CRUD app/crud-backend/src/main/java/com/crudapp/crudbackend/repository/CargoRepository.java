package com.crudapp.crudbackend.repository;

import com.crudapp.crudbackend.model.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
}
