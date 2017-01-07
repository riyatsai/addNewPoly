<?php
		require_once('../db/db.php');
		DB::db_connect();
		$_POST['vecList'] = json_decode($_POST['vecList']);
		$_POST['pl_name'] = json_decode($_POST['pl_name']);
		$_POST['pl_des']  = json_decode($_POST['pl_des']);
		for($i=0;$i<count($_POST['vecList']);$i++){
			$json = json_encode($_POST['vecList'][$i]);
			$sql = 'INSERT INTO test("polyName","comment","polyCoor") VALUES (\''.$_POST['pl_name'][$i].'\',\''.$_POST['pl_des'][$i].'\',\''.str_replace('"','\"',$json).'\')';
			DB::db_excute($sql);
		}
		DB::db_close();
?>
