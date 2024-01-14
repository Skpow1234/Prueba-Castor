package com.crudapp.crudbackend.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("No existe un empleado con el siguiente Id - " + id);
    }
}
