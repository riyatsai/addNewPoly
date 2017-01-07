<?php
	class DB{
		const DSN='pgsql:host=localhost;port=3307;dbname=postgres';
		const DB_USERNAME='postgres';
		const DB_PASSWORD='abc+1234';

		static $db;
		public function __construct(){
		}
		static function db_excute($query,$bind=array()){//insert update delete 
			$statement = self::$db->prepare($query);
			$statement->execute($bind);
		}
		static function db_connect(){
			try{ 
				self::$db=new PDO(self::DSN,self::DB_USERNAME,self::DB_PASSWORD); 
			}
			catch(PDOException $e){ 
				echo 'Connection failed: ' . $e->getMessage();
				exit(); 
			}		
		}
		static function db_fetch($query,$bind=array()){//select 
			$statement = self::$db->prepare($query);
			$statement->execute($bind);
			return $statement->fetchAll(PDO::FETCH_ASSOC);
		}
		static function db_close(){
			self::$db = null;
		}

	}
?>