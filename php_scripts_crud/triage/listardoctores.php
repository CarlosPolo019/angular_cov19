<?php

header("Access-Control-Allow-Origin: *");
require '../connectdb.php';
error_reporting(E_ERROR);
$pacientes = [];
$sql = "select d.*,h.nombre as nombre_hospital from doctor d inner join hospital h on d.id_hospital = h.id where d.id_hospital = h.id and d.eliminado is null";

if($result = mysqli_query($con,$sql)){
    $id = 0;
    while($row = mysqli_fetch_assoc($result)){
        $pacientes[$id]['id'] = $row['id'];
        $pacientes[$id]['nombre'] = $row['primer_nombre']." ".$row['primer_apellido'];
        $pacientes[$id]['telefono'] = $row['telefono'];
        $pacientes[$id]['tipo_sangre'] = $row['tipo_sangre'];
        $pacientes[$id]['fecha_nacimiento'] = $row['fecha_nacimiento'];
        $pacientes[$id]['experiencia'] = $row['experiencia'];
        $pacientes[$id]['hospital'] = $row['nombre_hospital'];
        $pacientes[$id]['usuario_id'] = $row['usuario_id'];

        $id++;
    }

    header('Content-type: application/json');
    echo json_encode($pacientes);

}else{
     header('HTTP/1.1 400 Hubo un problema, verifique la tabla paciente');
            exit(0);
}

?>