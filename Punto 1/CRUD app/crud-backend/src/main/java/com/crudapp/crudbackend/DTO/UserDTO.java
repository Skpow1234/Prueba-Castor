package com.crudapp.crudbackend.DTO;

import com.crudapp.crudbackend.model.Cargo;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserDTO {
    private Long id;
    private String cedula;
    private String nombre;
    private byte[] foto;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date fechaIngreso;
    private Cargo cargo;
}
