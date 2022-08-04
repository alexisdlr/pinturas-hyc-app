<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');


if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['id'])){
      $query="select * from usuarios where id=".$_GET['id'];
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
  }else{
      $query="select * from usuarios";
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetchAll()); 
  }
  header("HTTP/1.1 200 OK");
  exit();
}

if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $nombre=$_POST['nombre'];
  $correo=$_POST['correo'];
  $contrasena=$_POST['password'];
  $query="insert into usuarios(nombre, correo, password) values ('$nombre', '$correo', '$contrasena')";
  $queryAutoIncrement="select MAX(id) as id from usuarios";
  $resultado=metodoPost($query, $queryAutoIncrement);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}

if($_POST['METHOD']=='PUT'){
  unset($_POST['METHOD']);
  $id=$_GET['id'];
  $nombre=$_POST['nombre'];
  $correo=$_POST['correo'];
  $password=$_POST['password'];
  $query="UPDATE usuarios SET nombre='$nombre', correo='$correo',  password='$password' WHERE id='$id'";
  $resultado=metodoPut($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}

if($_POST['METHOD']=='DELETE'){
  unset($_POST['METHOD']);
  $id=$_GET['id'];
  $query="DELETE FROM usuarios WHERE id='$id'";
  $resultado=metodoDelete($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
header('Content-Type: aplication/json');

header("HTTP/1.1 400 Bad Request");
