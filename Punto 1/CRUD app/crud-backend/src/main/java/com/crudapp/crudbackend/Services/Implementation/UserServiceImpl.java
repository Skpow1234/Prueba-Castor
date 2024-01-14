package com.crudapp.crudbackend.Services.Implementation;

import com.crudapp.crudbackend.DTO.UserDTO;
import com.crudapp.crudbackend.Services.UserService;
import com.crudapp.crudbackend.exception.UserNotFoundException;
import com.crudapp.crudbackend.model.User;
import com.crudapp.crudbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO newUser(UserDTO newUserDTO) {
        User user = convertToEntity(newUserDTO);
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return convertToDTO(user);
    }

    @Override
    public UserDTO updateUser(UserDTO newUserDTO, Long id) {
        User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        userToUpdate.setCedula(newUserDTO.getCedula());
        userToUpdate.setNombre(newUserDTO.getNombre());
        userToUpdate.setFoto(newUserDTO.getFoto());
        userToUpdate.setFechaIngreso(newUserDTO.getFechaIngreso());
        userToUpdate.setCargo(newUserDTO.getCargo());

        User updatedUser = userRepository.save(userToUpdate);
        return convertToDTO(updatedUser);
    }

    @Override
    public String deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id " + id + " has been deleted successfully";
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setCedula(user.getCedula());
        userDTO.setNombre(user.getNombre());
        userDTO.setFoto(user.getFoto());
        userDTO.setFechaIngreso(user.getFechaIngreso());
        userDTO.setCargo(user.getCargo());
        return userDTO;
    }

    private User convertToEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setCedula(userDTO.getCedula());
        user.setNombre(userDTO.getNombre());
        user.setFoto(userDTO.getFoto());
        user.setFechaIngreso(userDTO.getFechaIngreso());
        user.setCargo(userDTO.getCargo());
        return user;
    }
}



