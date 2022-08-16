<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');


if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['id'])){
      $query="select * from v_totalestimado where id=".$_GET['id'];
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
  }else{
      $query="select * from v_totalestimado";
      $resultado=metodoGet($query);
      echo json_encode($resultado->fetchAll()); 
  }
  header("HTTP/1.1 200 OK");
  exit();
}

header("HTTP/1.1 400 Bad Request");
