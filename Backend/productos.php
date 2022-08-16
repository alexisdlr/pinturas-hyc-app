<?php

include 'bd/bd.php';
require_once('conexion.php');
require_once('api.php');
require_once('cors.php');


if($_SERVER['REQUEST_METHOD']=='GET'){
    $vector = array();
    $api = new ApiColores();
    $vector = $api->getProductos();
    $json = json_encode($vector);
    echo $json;
  
  exit();
}

if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $nombre=$_POST['nombre'];
  $tipo=$_POST['tipo'];
  $marca=$_POST['marca'];
  $tamano=$_POST['tamano'];
  $stock=$_POST['stock'];
  $acabado=$_POST['acabado'];
  $idColor = $_POST['idColor'];
  $stockMin=$_POST['stockMin'];
  $precioC=$_POST['precioC'];
  $precioV=$_POST['precioV'];

  $query="insert into productos(nombre, tipo, marca,tamano,stock, acabado, idColor, precioC, precioV, stockMin)
   values ('$nombre', '$tipo', '$marca', '$tamano','$stock', '$acabado', '$idColor', '$precioC', '$precioV', '$stockMin')";
  $queryAutoIncrement="select MAX(id) as id from productos";
  $resultado=metodoPost($query, $queryAutoIncrement);
  echo json_encode($resultado);
  var_dump($query);
  header("HTTP/1.1 200 OK");
  exit();
}

if($_POST['METHOD']=='PUT'){
  unset($_POST['METHOD']);
  $id=$_GET['id'];
  $nombre=$_POST['nombre'];
  $tipo=$_POST['tipo'];
  $marca=$_POST['marca'];
  $tamano=$_POST['tamano'];
  $acabado=$_POST['acabado'];
  $query="UPDATE productos SET nombre='$nombre', tipo='$tipo', marca='$marca', tamano='$tamano', acabado='$acabado' WHERE id='$id'";
  $resultado=metodoPut($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}

if($_POST['METHOD']=='DELETE'){
  unset($_POST['METHOD']);
  $id=$_GET['id'];
  $query="DELETE FROM productos WHERE id='$id';";
  $resultado=metodoDelete($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
