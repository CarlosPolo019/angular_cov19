<?php
Header("Access-Control-Allow-Origin: *");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
include 'conexionDb.php';
$Id = (int) $_GET["id"];
$result = $con->query("SELECT * FROM tbl_doctor WHERE Id = $Id ");
    class Result {}
    $response = new Result();
if ($result->num_rows > 0){
    $row = mysqli_fetch_assoc($result);
    $response->Nombre_doctor = $row['Nombre_doctor'];
    $response->Direccion_doctor = $row['Direccion_doctor'];
    $response->Celular_doctor = $row['Celular_doctor'];
    $response->Tipo_sangre = $row['Tipo_sangre'];
    $response->Anos_experiencia = $row['Anos_experiencia'];
    $response->Fecha_nacimiento = $row['Fecha_nacimiento'];
    $response->Id = $Id;
    header('Content-type: application/json');
    echo json_encode($response);
}else{
    http_response_code(400);
}
$con->close();
 ?>