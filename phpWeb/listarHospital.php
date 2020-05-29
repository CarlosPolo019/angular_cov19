<?php
Header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include 'conexionDb.php';
    $result = $con->query("SELECT * FROM tbl_hospital") ;
        $hospitales = [];
    if ($result->num_rows > 0) {
        $i=0;
       while ($row = mysqli_fetch_assoc($result)) {
            $hospitales[$i]["nombre"] = $row['nombre'];
            $hospitales[$i]["telefono"] = $row['celular'];
            $hospitales[$i]["direccion"] = $row['direccion'];
            $hospitales[$i]["nit"] = $row['nit'];
            $hospitales[$i]["nombre_propietario"] = $row['nombre_propietario'];
            $hospitales[$i]["id"] = strval($row['id']);
           $i++;
       }
       header('Content-type: application/json');
       echo json_encode($hospitales);

    }else{
        http_response_code(400);
    }
    $con->close();
?>