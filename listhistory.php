<?php
header('Content-type: application/json');

//CROS / enable cookie saving on remote
if(isset($_SERVER['HTTP_ORIGIN'])){
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Methods: GET");
}

$history_data = array();
$expiretime = time() + (86400 * 30);
if(isset($_COOKIE['user'])){
	session_start($_COOKIE['user']);
	// again advance time to never exipre
	setcookie("user",session_id(),$expiretime, "/");
	//Default view is
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
	//
	shell_exec ("curl -X PUT http://127.0.0.1:5984/vod_".session_id());
}
$version = (float) phpversion();
if ($version > 5.4) {
    echo json_encode($history_data, JSON_PRETTY_PRINT);
} else {
    echo json_encode($history_data);
}