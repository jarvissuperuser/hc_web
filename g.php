<?php

$c = curl_init();

$url = "https://tmgdigital.atlassian.net/rest/api/2/search?RapidViewId=2&view=planning.nodetail&jql=status!=Done%20AND%20issuetype=Task";

curl_setopt($c, CURLOPT_URL,$url);
$auth =  file_get_contents("auth.ini");
$post = ['startAt'=>'0','maxresults'=>'200'];
$hA = "Authorisation: BASIC $auth";
$hA2 =  "Content-Type: application/json";
curl_setopt($c,CURLOPT_HTTPHEADER,[$hA,$hA2]);
curl_setopt($c,CURLOPT_POSTFIELDS,json_encode($post));
curl_exec($c);
