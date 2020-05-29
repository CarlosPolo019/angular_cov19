<?php
Header("Access-Control-Allow-Origin: *");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
include 'conexionDb.php';
$Id = (int) $_GET["id"];
$result = $con->query(" DELETE FROM tb_doctor WHERE Id = $Id" );
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