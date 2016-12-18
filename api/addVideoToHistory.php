<?php
/**
@author Ramratan Gupta
*/
include_once('./common.php');
if(isset($_COOKIE['user'])){
	session_start($_COOKIE['user']);
	// again advance time to never exipre
	setcookie("user",session_id(),$expiretime, "/");
	//Default view is
	if(isset($_POST['video_json'],$_POST['video_id'])){
		/*
		add video JSON in couch DB for history, on duplicate enty it will not add and throw error.
		it can be improve with head function to check exist or not.
		*/
		$history_json = shell_exec("curl -X PUT http://localhost:5984/vod_".session_id()."/".$_POST['video_id']." -H 'Content-Type:application/json' -d '".$_POST['video_json']."'");
		$history_data['success'] = json_decode($history_json,true);
	}else{
		$history_data['error'][] = 'Not valid video data - allowed keys video_json, video_id';
	}
	
}else{
	$history_data['error'][] = 'Not a valid user';
}
echoJson($history_data);