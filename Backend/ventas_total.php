<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');


if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['id'])){
      $query="select * from total_vendidos where id=".$_GET['id'];
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
  }else{
      $query="select * from total_vendidos";
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetchAll()); 
  }
  header("HTTP/1.1 200 OK");
  exit();
}

if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $total=$_POST['totalV'];
  $date = date('Y-m-d H:i:s');
  $prodId = $_POST['idProd'];
  $query="insert into ventas( totalVenta, fecha, idProd) values ( '$total', '$date','$prodId' )";
  $queryAutoIncrement="select MAX(id) as id from ventas";
  $resultado=metodoPost($query, $queryAutoIncrement);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}

if($_POST['METHOD']=='PUT'){
  unset($_POST['METHOD']);
  $total=$_POST['totalV'];
  $date = date('Y-m-d H:i:s');
  $query="UPDATE ventas SET nombre='$nombre', correo='$correo',  password='$password' WHERE id='$id'";
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
