package com.crudapp.crudbackend.controller;

import com.crudapp.crudbackend.DTO.CargoDTO;
import com.crudapp.crudbackend.Services.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CargoController {

    @Autowired
    private CargoService cargoService;

    @PostMapping("/cargo")
    public CargoDTO newCargo(@RequestBody CargoDTO newCargoDTO) {
        return cargoService.newCargo(newCargoDTO);
    }

    @GetMapping("/cargos")
    public List<CargoDTO> getAllCargos() {
        return cargoService.getAllCargos();
    }

    @GetMapping("/cargo/{id}")
    public CargoDTO getCargoById(@PathVariable Long id) {
        return cargoService.getCargoById(id);
    }

    @PutMapping("/cargo/{id}")
    public CargoDTO updateCargo(@RequestBody CargoDTO newCargoDTO, @PathVariable Long id) {
        return cargoService.updateCargo(newCargoDTO, id);
    }

    @DeleteMapping("/cargo/{id}")
    public String deleteCargo(@PathVariable Long id) {
        return cargoService.deleteCargo(id);
    }
}

