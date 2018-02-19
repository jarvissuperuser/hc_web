<?php

$c = curl_init();

$url = "https://tmgdigital.atlassian.net/rest/api/2/search?RapidViewId=2&jql=status!=Done";
try{

$cmd  =  file_get_contents('info.ini');
echo shell_exec($cmd);
/*curl_setopt($c, CURLOPT_URL,$url);
$auth =  file_get_contents("auth.ini");

$post = ['startAt'=>'0','maxresults'=>'200'];
$hA = "Authorization: BASIC $auth";
$hA2 =  "Content-Type: application/json";
//$hA3 =  "Content-Length: ".strlen(json_encode($post));
curl_setopt($c,CURLOPT_HTTPHEADER,[$hA,$hA2]);
curl_setopt($c,CURLOPT_CUSTOMREQUEST,'GET');
//curl_setopt($c,CURLOPT_POSTFIELDS,json_encode($post));
curl_exec($c);*/
//echo  $hA;
}
catch(Exception $e){
	echo $e->getTraceAsString();
}
