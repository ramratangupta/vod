<?php
/**
@author Ramratan Gupta
*/
include_once('./common.php');
if(isset($_COOKIE['user'])){
	session_start($_COOKIE['user']);
	// again advance time to never exipre
	setcookie("user",session_id(),$expiretime, "/");
	//read all the history object from cuch DB
	$history_json = shell_exec("curl -X GET http://localhost:5984/vod_".session_id()."/_all_docs?include_docs=true");

	$history_decode  = json_decode($history_json,true);
	if(isset($history_decode['rows'])){
		foreach($history_decode['rows'] as $v){
			$history_data[] = $v['doc'];
		}
	}
	
}else{
	//first time visitor
	session_start();
	//set cookie for next time to remmember
	setcookie("user",session_id(),$expiretime, "/");
	//Create couch Database for this user
	shell_exec ("curl -X PUT http://127.0.0.1:5984/vod_".session_id());
}
echoJson($history_data);