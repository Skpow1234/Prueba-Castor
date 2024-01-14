package com.crudapp.crudbackend.Services;

import com.crudapp.crudbackend.DTO.CargoDTO;

import java.util.List;

public interface CargoService {
    CargoDTO newCargo(CargoDTO newCargoDTO);

    List<CargoDTO> getAllCargos();

    CargoDTO getCargoById(Long id);

    CargoDTO updateCargo(CargoDTO newCargoDTO, Long id);

    String deleteCargo(Long id);
}

