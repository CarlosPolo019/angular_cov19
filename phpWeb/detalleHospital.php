<?php
Header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
include 'conexionDb.php';
$Id = (int) $_GET["id"];
$resultado = $con->query("SELECT * FROM tbl_hospital WHERE id = $Id");
    class Result {}
    $response = new Result();
if ($resultado->num_rows > 0 ){
    $row = mysqli_fetch_assoc($resultado);
    $response->nombre = $row['nombre'];
    $response->direccion = $row['direccion'];
    $response->nit = $row['nit'];
    $response->nombre_propietario = $row['nombre_propietario'];
    $response->telefono = $row['celular'];
    $response->id = strval($row['id']);
    header('Content-type: application/json');
    echo json_encode($response);
}else{
    http_response_code(400);
}
$con->close();
 ?>