package com.crudapp.crudbackend.controller;


import com.crudapp.crudbackend.DTO.UserDTO;
import com.crudapp.crudbackend.Services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public UserDTO newUser(@RequestPart("userDTO") String userDTO,
                           @RequestPart("foto") MultipartFile foto) throws IOException {
        UserDTO newUserDTO = new ObjectMapper().readValue(userDTO, UserDTO.class);
        newUserDTO.setFoto(foto.getBytes());
        return userService.newUser(newUserDTO);
    }


    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/user/{id}")
    public UserDTO updateUser(@RequestBody UserDTO newUserDTO, @PathVariable Long id) {
        return userService.updateUser(newUserDTO, id);
    }

    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}

