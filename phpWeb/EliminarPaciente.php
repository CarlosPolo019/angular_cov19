<?php
Header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
error_reporting(0);
include 'conexionDb.php';
$Id = (int) $_GET["id"];
$result = $con->query(" DELETE FROM tbl_paciente WHERE id = $Id" );
if($result){
    http_response_code(200);
    class Result {}
    $response = new Result();
    $response->resultado = 'OK';
    $response->mensaje = 'datos eliminados';
    header('Content-Type: application/json');
    echo json_encode($response);
}else{
    $response->resultado = 'ERROR';
    header('Content-Type: application/json');
    echo json_encode($response);
}
$con->close();
 ?>