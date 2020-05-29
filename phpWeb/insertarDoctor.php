<?php
Header("Access-Control-Allow-Origin: *");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
include 'conexionDb.php';
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $contents = file_get_contents("php://input");
    $request = json_decode($contents,true);
    $request = $request["data"];
    $Nombre_doctor = $request["nombre_doctor"];
    $Direccion_doctor = $request["direccion_doctor"];
    $Celular_doctor = $request["celular_doctor"];
    $Tipo_sangre = $request["tipo_sangre"];
    $Anos_experiencia = $request["anos_experiencia"];
    $date_temp = new DateTime($request['fecha_nacimiento']);
    $Fecha_nacimiento =  $date_temp->format('Y-m-d') ;
    class Result {}
    $response = new Result();
        $stm = $con->query("INSERT INTO tbl_doctor (Nombre_doctor, Direccion_doctor, Celular_doctor, Tipo_sangre, Anos_experiencia, Fecha_nacimiento, Hospital_Id) VALUES ($nombre_doctor, $direccion_doctor, $celular_doctor, $tipo_sangre, $anos_experiencia, $fecha_nacimiento, 1) ");
        if ($stm->num_rows > 0) {
            $response->resultado = 'OK';
            $response->mensaje = 'datos insertados';
            header('Content-Type: application/json');
            echo json_encode($response);
        }else{
            http_response_code(400);
        }
        $con->close();
}
?>