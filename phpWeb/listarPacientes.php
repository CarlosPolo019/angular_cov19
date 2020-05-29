<?php
Header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
error_reporting(0);
include 'conexionDb.php';
    $pacientes = [];
    $result = $con->query("SELECT * FROM tbl_paciente") ;
    if ($result->num_rows > 0) {
        $i = 0;
       while ($row = mysqli_fetch_assoc($result)) {
            $pacientes[$i]['id'] = $row['id'];
            $pacientes[$i]['nombre_paciente'] = $row['nombre_paciente'];
            $pacientes[$i]['direccion_paciente'] = $row['direccion_paciente'];
            $pacientes[$i]['eps'] = $row['eps'];
            $pacientes[$i]['nombre_acompanante'] = $row['nombre_acompanante'];
            $pacientes[$i]['celular_acompanante'] = $row['celular_acompanante'];
            $pacientes[$i]['historial_medico'] = $row['historial_medico'];
            $pacientes[$i]['detalle_historial'] = $row['detalle_historial'];
           $i++;
       }
       header('Content-type: application/json');
       echo json_encode($pacientes);
    }else{
         http_response_code(400);
    }
    $con->close();
?>