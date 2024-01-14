SELECT 
    S.ID_Solicitud AS "Nro Solicitud",
    SO.Nombre AS "Nombre Solicitante",
    S.ID_EstadoSolicitud AS "Nro Estado Solicitud",
    ES.Nombre AS "Nombre Estado de la Solicitud",
    SE.ID_Servicio AS "Nro Servicio",
    SE.Nombre AS "Nombre Servicio"
FROM 
    Solicitud S
    JOIN Solicitante SO ON S.ID_Solicitante = SO.ID_Solicitante
    JOIN EstadoSolicitud ES ON S.ID_EstadoSolicitud = ES.ID_EstadoSolicitud
    LEFT JOIN SolicitudServicio SS ON S.ID_Solicitud = SS.ID_Solicitud
    LEFT JOIN Servicio SE ON SS.ID_Servicio = SE.ID_Servicio;
