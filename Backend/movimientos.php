<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');


if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['id'])){
      $query="select * from v_movs where id=".$_GET['id'];
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
  }else{
      $query="select * from v_movs";
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetchAll()); 
  }
  header("HTTP/1.1 200 OK");
  exit();
}

if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $tipo=$_POST['tipo'];
  $cantidad=$_POST['cantidad'];
  $idUsuario=$_POST['idUsuario'];
  $idProd=$_POST['idProd'];
  $date = date('Y-m-d H:i:s');
  $query="insert into movimientos (tipo, cantidad,fecha,idUsuario, idProd) values ('$tipo', '$cantidad','$date','$idUsuario', '$idProd')";
  $queryAutoIncrement="select MAX(id) as id from movimientos";
  $resultado=metodoPost($query, $queryAutoIncrement);
  echo json_encode($resultado);
  var_dump($query);
  header("HTTP/1.1 200 OK");
  exit();
}


if($_POST['METHOD']=='DELETE'){
  unset($_POST['METHOD']);
  $id=$_GET['id'];
  $query="DELETE FROM movimientos WHERE id='$id'";
  $resultado=metodoDelete($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
header('Content-Type: aplication/json');

header("HTTP/1.1 400 Bad Request");
