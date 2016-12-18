<?php
header("Content-Type: application/json; charset=utf-8");
if(isset($_SERVER['HTTP_ORIGIN'])){
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Methods: POST");
}
$expiretime = time() + (86400 * 30);
$history_data = array();
if(isset($_COOKIE['user'])){
	session_start($_COOKIE['user']);
	// again advance time to never exipre
	setcookie("user",session_id(),$expiretime, "/");
	//Default view is
	if(isset($_POST['video_json'],$_POST['video_id'])){
		$history_json = shell_exec("curl -X PUT http://localhost:5984/vod_".session_id()."/".$_POST['video_id']." -H 'Content-Type:application/json' -d '".$_POST['video_json']."'");
		$history_data['success'] = json_decode($history_json,true);
	}else{
		$history_data['error'][] = 'Not valid video data - allowed keys video_json, video_id';
	}
	
}else{
	$history_data['error'][] = 'Not a valid user';
}
$version = (float) phpversion();
if ($version > 5.4) {
    echo json_encode($history_data, JSON_PRETTY_PRINT);
} else {
    echo json_encode($history_data);
}