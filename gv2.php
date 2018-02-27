<?php

$c = curl_init();

$url2 = "https://tmgdigital.atlassian.net/rest/api/2/myself";
$url = "https://tmgdigital.atlassian.net/rest/api/2/search?RapidViewId=2&maxResults=100&jql=(issueType=Improvement%20OR%20issueType=Bug%20OR%20issueType=Task%20OR%20issueType=Story%20OR%20issueType=10006)%20AND%20(status!=Done%20AND%20status!=10100%20AND%20status!=10600)";
try{

//$cmd  =  file_get_contents('info.ini');
//echo shell_exec($cmd);
curl_setopt($c, CURLOPT_URL,$url);
$auth =  file_get_contents("auth.ini");

$post = ['startAt'=>'0','maxresults'=>'200'];
$hA = "Authorization: Basic $auth";
$hA2 =  "Content-Type : application/json";
//curl_setopt($c,CURLOPT_CUSTOMREQUEST,'GET');
//$hA3 =  "Content-Length: ".strlen(json_encode($post));
curl_setopt($c,CURLOPT_HTTPHEADER,[$hA,$hA2]);
//curl_setopt($c,CURLOPT_HEADER,0);
//curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
//curl_setopt($c,CURLOPT_POSTFIELDS,json_encode($post));
curl_exec($c);
//echo  $hA;
}
catch(Exception $e){
	echo $e->getTraceAsString();
}
