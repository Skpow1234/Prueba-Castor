package com.crudapp.crudbackend.Services.Implementation;

import com.crudapp.crudbackend.DTO.CargoDTO;
import com.crudapp.crudbackend.Services.CargoService;
import com.crudapp.crudbackend.exception.CargoNotFoundException;
import com.crudapp.crudbackend.model.Cargo;
import com.crudapp.crudbackend.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CargoServiceImpl implements CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    @Override
    public CargoDTO newCargo(CargoDTO newCargoDTO) {
        Cargo cargo = convertToEntity(newCargoDTO);
        Cargo savedCargo = cargoRepository.save(cargo);
        return convertToDTO(savedCargo);
    }

    @Override
    public List<CargoDTO> getAllCargos() {
        List<Cargo> cargos = cargoRepository.findAll();
        return cargos.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public CargoDTO getCargoById(Long id) {
        Cargo cargo = cargoRepository.findById(id)
                .orElseThrow(() -> new CargoNotFoundException(id));
        return convertToDTO(cargo);
    }

    @Override
    public CargoDTO updateCargo(CargoDTO newCargoDTO, Long id) {
        Cargo cargoToUpdate = cargoRepository.findById(id)
                .orElseThrow(() -> new CargoNotFoundException(id));

        cargoToUpdate.setNombre(newCargoDTO.getNombre());

        Cargo updatedCargo = cargoRepository.save(cargoToUpdate);
        return convertToDTO(updatedCargo);
    }

    @Override
    public String deleteCargo(Long id) {
        if (!cargoRepository.existsById(id)) {
            throw new CargoNotFoundException(id);
        }
        cargoRepository.deleteById(id);
        return "Cargo with id " + id + " has been deleted successfully";
    }

    private CargoDTO convertToDTO(Cargo cargo) {
        CargoDTO cargoDTO = new CargoDTO();
        cargoDTO.setIdCargo(cargo.getIdCargo());
        cargoDTO.setNombre(cargo.getNombre());
        return cargoDTO;
    }

    private Cargo convertToEntity(CargoDTO cargoDTO) {
        Cargo cargo = new Cargo();
        cargo.setIdCargo(cargoDTO.getIdCargo());
        cargo.setNombre(cargoDTO.getNombre());
        return cargo;
    }
}
