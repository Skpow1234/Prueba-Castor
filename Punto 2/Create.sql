CREATE TABLE Solicitante (
    ID_Solicitante INT PRIMARY KEY,
    Nombre VARCHAR(255)
);

CREATE TABLE EstadoSolicitud (
    ID_EstadoSolicitud INT PRIMARY KEY,
    Nombre VARCHAR(255)
);

CREATE TABLE Solicitud (
    ID_Solicitud INT PRIMARY KEY,
    FechaSolicitud DATE,
    ID_Solicitante INT,
    ID_EstadoSolicitud INT,
    FOREIGN KEY (ID_Solicitante) REFERENCES Solicitante(ID_Solicitante),
    FOREIGN KEY (ID_EstadoSolicitud) REFERENCES EstadoSolicitud(ID_EstadoSolicitud)
);

CREATE TABLE Servicio (
    ID_Servicio INT PRIMARY KEY,
    Nombre VARCHAR(255)
);

CREATE TABLE SolicitudServicio (
    ID_Solicitud INT,
    ID_Servicio INT,
    PRIMARY KEY (ID_Solicitud, ID_Servicio),
    FOREIGN KEY (ID_Solicitud) REFERENCES Solicitud(ID_Solicitud),
    FOREIGN KEY (ID_Servicio) REFERENCES Servicio(ID_Servicio)
);
