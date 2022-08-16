<?php
require_once('conexion.php');
require_once('api.php');
require_once('cors.php');

$method = $_SERVER['REQUEST_METHOD'];

if($method == "GET") {
    $vector = array();
    $api = new ApiColores();
    $vector = $api->getImagenes();
    $json = json_encode($vector);
    echo $json;
}

if($method=="POST"){
    $json = null;
    $foto = (file_get_contents($_FILES['imagen']['tmp_name']));
    $nombre = $_POST['nombre'];
    $codigo = $_POST['codigo'];
    $api = new ApiColores();
    $json = $api->addImagen($nombre,$foto, $codigo);
    echo $json;
}

if($method=="DELETE"){
    $json = null;
    $id = $_REQUEST['id'];
    $api = new ApiColores();
    $json = $api->deleteImagen($id);
    echo $json;
}


?>