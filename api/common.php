<?php
/**
@author Ramratan Gupta
*/
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

/**
an util function to use JSON_PRETTY_PRINT
*/
function echoJson($history_data){
$version = (float) phpversion();
	if ($version > 5.4) {
	    echo json_encode($history_data, JSON_PRETTY_PRINT);
	} else {
	    echo json_encode($history_data);
	}
}