<?php
Header("Access-Control-Allow-Origin: *");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
include 'conexionDb.php';
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $contents = file_get_contents("php://input");
    $request = json_decode($contents,true);
    $Id = (int) $request["Id"];
    $Nombre_doctor = $request["Nombre_doctor"];
    $Direccion_doctor = $request["Direccion_doctor"];
    $Celular_doctor = $request["Celular_doctor"];
    $Tipo_sangre = $request["Tipo_sangre"];
    $Anos_experiencia = $request["Anos_experiencia"];
    $date_temp = new DateTime($request['Fecha_nacimiento']);
    $Fecha_nacimiento =  $date_temp->format('Y-m-d') ;
    class Result {}
    $response = new Result();
        $stmt = $con->prepare("UPDATE  tbl_doctor SET Nombre_doctor = $Nombre_doctor, Direccion_doctor = $Direccion_doctor,  Celular_doctor = $Celular_doctor, Tipo_sangre = $Tipo_sangre, Anos_experiencia = $Anos_experiencia, Fecha_nacimiento = $Fecha_nacimiento WHERE Id = $Id ");
        if ($stmt->num_rows > 0) {
           $response->resultado = 'OK';
            $response->mensaje = 'datos modificados';
            header('Content-Type: application/json');
            echo json_encode($response);
        }else{
            $response->resultado = 'ERROR';
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        $con->close();
}
 ?>