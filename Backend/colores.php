<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');


if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['id'])){
      $query="select * from colores where id=".$_GET['id'];
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
  }else{
      $query="select * from colores";
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetchAll()); 
  }
  header("HTTP/1.1 200 OK");
  exit();
}
if(isset($_FILES['imagen'])) {
  $file = $_FILES['imagen'];
  $nombre = $file['name'];
  $carpeta = './images/';
  $ruta_prov = $file['tmp_name'];
  $src = $carpeta.$nombre;
  move_uploaded_file($ruta_prov, $src);
  $imagen='./images/'.$nombre;


}

if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $nombre=$_POST['nombre'];
  $codigo=$_POST['codigo'];
  $query="insert into colores(nombre, imagen, codigo) values ('$nombre', '$imagen', '$codigo')";
  $queryAutoIncrement="select MAX(id) as id from colores";
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
  $imagen=$_POST['imagen'];
  $codigo=$_POST['codigo'];
  $query="UPDATE colores SET nombre='$nombre', imagen='$imagen', codigo='$codigo' WHERE id='$id'";
  $resultado=metodoPut($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}

if($_POST['METHOD']=='DELETE'){
  unset($_POST['METHOD']);
  $id=$_GET['id'];
  $query="DELETE FROM colores WHERE id='$id'";
  $resultado=metodoDelete($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
header('Content-Type: aplication/json');

header("HTTP/1.1 400 Bad Request");
