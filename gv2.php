<?php

$c = curl_init();
$jql_post =  filter_input(INPUT_POST,'jql');
$jql="project%20in%20(TD,%20HL,%20ST,%20BMM,%20ADF,%20ADOPS,%20BDTV,%20BLAC".
",%20BOOK,%20DB,%20BSS,%20BUS,%20CR,%20COS,%20DIS,%20DS,%20FM,%20HEL,%20HR,".
"%20IG,%20%22IN%22,%20ISS,%20MAG,%20MAR,%20MIMS,%20NEW,%20RDM,%20RED,%20SHO,".
"%20SW,%20SC,%20STDE,%20TOP,%20SWSOC,%20EM,%20FMSA,%20HC,%20STGN,%20TS,%20TL,".
"%20TMF,%20WAN,%20%22HeraldLIVE%20Replatform%22)%20ORDER%20BY%20Rank%20ASC";
$jqlIssFilter="(issueType=Improvement%20OR%20issueType=Bug%20OR%20issueType=Task%20OR%20issueType=Story%20OR%20issueType=10006)";
$jqlStaFilter="(status!=Done%20AND%20status!=10100%20AND%20status!=10600)";
$url2 = "https://tmgdigital.atlassian.net/rest/api/2/myself";
$url = "https://tmgdigital.atlassian.net/rest/api/2/search?maxResults=100&".
"jql=$jqlIssFilter" . 
"%20AND%20{$jqlStaFilter}%20AND%20".
"$jql";
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
