<?php
Header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
include 'conexionDb.php';
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $contents = file_get_contents("php://input");
    $request = json_decode($contents,true);
    $request = $request["data"];
    $Nombre_paciente = $request["nombre_completo"];
    $Direccion_paciente = $request["direccion"];
    $Eps = $request["eps"];
    $Nombre_acompanante = $request["nombre_acom"];
    $Celular_acompanante = $request["telefono_acom"];
    $Historial_medico = "SI";//$request["historial_medico"];
    $Detalle_historial = "SI";//$request["detalle_historial"];

    class Result {}
    $response = new Result();


$query = "INSERT INTO tbl_paciente (nombre_paciente, direccion_paciente, eps, nombre_acompanante, celular_acompanante, historial_medico, detalle_historial) VALUES (?,?,?,?,?,?,?)";
$stmt1 = mysqli_prepare($con, $query);
if ( !$stmt1 ) {
  die('mysqli error: '.mysqli_error($con));
}
mysqli_stmt_bind_param($stmt1, 'sssssss',$Nombre_paciente, $Direccion_paciente, $Eps, $Nombre_acompanante, $Celular_acompanante, $Historial_medico, $Detalle_historial);
if ( !mysqli_execute($stmt1) ) {
     $response->resultado = 'ERROR';
            header('Content-Type: application/json');
            echo json_encode(mysqli_stmt_error($stmt));
}else{
            $response->resultado = 'OK';
            $response->mensaje = 'datos insertados';
            header('Content-Type: application/json');
            echo json_encode($response);
}
    $con->close();
}else{

    echo "Entro";

}
?>