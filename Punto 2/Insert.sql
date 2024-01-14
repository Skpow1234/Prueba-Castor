-- Insertar datos de ejemplo en la tabla Solicitante
INSERT INTO Solicitante (ID_Solicitante, Nombre) VALUES
    (1, 'Juan Perez'),
    (2, 'Maria Lopez');

-- Insertar datos de ejemplo en la tabla EstadoSolicitud
INSERT INTO EstadoSolicitud (ID_EstadoSolicitud, Nombre) VALUES
    (1, 'En Proceso'),
    (2, 'Aprobada'),
    (3, 'Rechazada');

-- Insertar datos de ejemplo en la tabla Solicitud
INSERT INTO Solicitud (ID_Solicitud, FechaSolicitud, ID_Solicitante, ID_EstadoSolicitud) VALUES
    (101, '2024-01-12', 1, 1),
    (102, '2024-01-13', 2, 2),
    (103, '2024-01-14', 1, 3);

-- Insertar datos de ejemplo en la tabla Servicio
INSERT INTO Servicio (ID_Servicio, Nombre) VALUES
    (501, 'Servicio A'),
    (502, 'Servicio B'),
    (503, 'Servicio C');

-- Insertar datos de ejemplo en la tabla SolicitudServicio
INSERT INTO SolicitudServicio (ID_Solicitud, ID_Servicio) VALUES
    (101, 501),
    (101, 502),
    (102, 503),
    (103, 501);
