<?php
Header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
include 'conexionDb.php';
$Id = (int) $_GET["id"];
$resultado = $con->query("SELECT * FROM tbl_paciente WHERE id = $Id");
    class Result {}
    $response = new Result();
if ($resultado->num_rows > 0 ){
    $row = mysqli_fetch_assoc($resultado);
    $response->nombre_completo = $row['nombre_paciente'];
    $response->direccion = $row['direccion_paciente'];
    $response->eps = $row['eps'];
    $response->nombre_acom = $row['nombre_acompanante'];
    $response->telefono_acom = $row['celular_acompanante'];
  //  $response->Historial_medico = $row['historial_medico'];
  //  $response->Detalle_historial = $row['detalle_historial'];
    $response->id = strval($row['id']);
    header('Content-type: application/json');
    echo json_encode($response);
}else{
    http_response_code(400);
}
$con->close();
 ?>