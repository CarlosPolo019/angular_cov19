<?php
Header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
error_reporting(0);
include 'conexionDb.php';
    $doctores = [];
    $result = $con->query("SELECT * FROM tbl_doctor") ;
    if ($result->num_rows > 0) {
        $i = 0;
       while ($row = mysqli_fetch_assoc($result)) {
            $doctores[$i]['Id'] = $row['Id'];
            $doctores[$i]['Nombre_doctor'] = $row['Nombre_doctor'];
            $doctores[$i]['Direccion_doctor'] = $row['Direccion_doctor'];
            $doctores[$i]['Celular_doctor'] = $row['Celular_doctor'];
            $doctores[$i]['Tipo_sangre'] = $row['Tipo_sangre'];
            $doctores[$i]['Anos_experiencia'] = $row['Anos_experiencia'];
            $doctores[$i]['Fecha_nacimiento'] = $row['Fecha_nacimiento'];
           $i++;
       }
       header('Content-type: application/json');
       echo json_encode($doctores);
    }else{
         http_response_code(400);
    }
    $con->close();
?>