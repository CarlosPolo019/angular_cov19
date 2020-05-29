<?php
    $con = new mysqli('localhost','root','mysql','proyecto_web');

    if ($con->connect_error) {
        echo $con->connect_error;
    }
    $con->set_charset('utf8');
 ?>