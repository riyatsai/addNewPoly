<?php
	require_once('../db/db.php');
	DB::db_connect();
	$query = 'SELECT * FROM test';
	echo json_encode(DB::db_fetch($query));

?>