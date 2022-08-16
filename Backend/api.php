<?php

class ApiColores{

public function getImagenes(){

   $vector = array();
   $conexion = new Conexion();
   $db = $conexion->getConexion();
   $sql = "SELECT * FROM colores";
   $consulta = $db->prepare($sql);
   $consulta->execute();
   while($fila = $consulta->fetch()) {
       $vector[] = array(
         "id" => $fila['id'],
         "nombre" => $fila['nombre'],
         "imagen" => base64_encode($fila['imagen']),
         "codigo" => $fila['codigo'],
       );
         
         }//fin del ciclo while 

   return $vector;
}

public function getProductos(){
  $sql = "SELECT * FROM v_productos";

  if(isset($_GET['id'])){
    $sql="select * from v_productos where id=".$_GET['id'];
  }
  $vector = array();
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $consulta = $db->prepare($sql);
  $consulta->execute();
  while($fila = $consulta->fetch()) {
      $vector[] = array(
        "id" => $fila['id'],
        "nombre" => $fila['nombre'],
        "tipo" => $fila['tipo'],
        "marca" => $fila['marca'],
        "tamano" => $fila['tamano'],
        "stock" => $fila['stock'],
        "acabado" => $fila['acabado'],
        "stockMin" => $fila['stockMin'],
        "precioC" => $fila['precioC'],
        "precioV" => $fila['precioV'],
        "imagen" => base64_encode($fila['imagen']),
      );
        
        }//fin del ciclo while 

  return $vector;
}

public function addImagen($nombre, $imagen, $codigo){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "INSERT INTO colores (nombre, imagen,codigo) VALUES (:nombre,:imagen, :codigo)";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':nombre', $nombre);
  $consulta->bindParam(':imagen', $imagen);
  $consulta->bindParam(':codigo', $codigo);
  $consulta->execute();

  return '{"msg":"imagen agregada"}';
}

public function deleteImagen($id){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "DELETE FROM colores WHERE id=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id); 
  $consulta->execute();

  return '{"msg":"imagen eliminada"}';
}




}

?>