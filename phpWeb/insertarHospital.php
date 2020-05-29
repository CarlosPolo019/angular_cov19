<?php
Header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
Header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
include 'conexionDb.php';
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $contents = file_get_contents("php://input");
    $request = json_decode($contents,true);
    $request = $request["data"];
    $Nombre = $request["nombre"];
    $Celular = $request["telular"];
    $Direccion = $request["direccion"];
    $Nit = $request["nit"];
    $Nombre_propietario = $request["nombre_propietario"];
    
    class Result {}
    $response = new Result();


$query = "INSERT INTO  tbl_hospital (nombre,celular , direccion , nit , nombre_propietario ) VALUES (?,?,?,?,?)";
$stmt1 = mysqli_prepare($con, $query);
if ( !$stmt1 ) {
  die('mysqli error: '.mysqli_error($con));
}
mysqli_stmt_bind_param($stmt1, 'sssss',$Nombre, $Celular, $Direccion, $Nit, $Nombre_propietario);
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
}
?>