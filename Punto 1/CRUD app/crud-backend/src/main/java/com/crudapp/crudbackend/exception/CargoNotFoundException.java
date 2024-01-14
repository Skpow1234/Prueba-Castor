package com.crudapp.crudbackend.exception;

public class CargoNotFoundException extends RuntimeException {
    public CargoNotFoundException(Long id) {
        super("Cargo not found with id: " + id);
    }
}

