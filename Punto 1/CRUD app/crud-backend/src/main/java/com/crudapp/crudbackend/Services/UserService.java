package com.crudapp.crudbackend.Services;

import com.crudapp.crudbackend.DTO.UserDTO;

import java.util.List;

public interface UserService {
    UserDTO newUser(UserDTO newUser);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id);

    UserDTO updateUser(UserDTO newUser, Long id);

    String deleteUser(Long id);
}


