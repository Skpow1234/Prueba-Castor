package com.crudapp.crudbackend.DTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CargoDTO {
    private Long idCargo;
    private String nombre;
}
