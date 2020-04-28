<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$data =array();
$data['DB_Name']='patogh_ketab';

$data['User_Name']='webservice';

$data['Date']=date("Y-m-d");

$data['key']=md5($data['User_Name'].$data['Date'].'988b0cf0a8dd0479b93af8bfd9994782');

$data['Function']='get_items_list';



// $data['Params']["loc_code"]=1;
$data['Params']["loc_code"]=$_GET["loc_code"];
$data['Params']["date"]= $_GET['newDate'];


	$ch = curl_init("http://ketaberp.ir/includes/webservices/webhesab_webservice.php");
	$postString = json_encode($data);
	// echo $postString;
	# Setting our options
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    //curl_setopt($ch, CURLOPT_CAINFO,'/var/www/demo/webhesab/cert/cc.crt');
	$response = curl_exec($ch);
	if($response!=null)
	{
		header("Content-type: application/json");
		$result = json_decode($response,true);
		//var_dump($result);
	}
	else $result['err']="ارتباط با سرور برقرار نشد!";
	curl_close($ch);
	
	//var_dump($response);
//exit;
    echo  json_encode($result['response']);
?>