<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');


if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['id'])){
      $query="select * from v_productos where id=".$_GET['id'];
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
  }else{
      $query="select * from v_productos";
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetchAll()); 
  }
  header("HTTP/1.1 200 OK");
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
  $query="DELETE FROM productos WHERE id='$id'";
  $resultado=metodoDelete($query);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}
header('Content-Type: aplication/json');

header("HTTP/1.1 400 Bad Request");
