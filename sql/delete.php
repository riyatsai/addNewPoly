<?php
require_once('../db/db.php');
		DB::db_connect();
		$id=$_POST['id'];
		$sql="DELETE FROM test WHERE id='$id'";
		DB::db_excute($sql);
		DB::db_close();
?>
