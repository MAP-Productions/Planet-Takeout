<?php
    
    require("../phpsqlajax_dbinfo.php");
$connection=mysql_connect (DB_HOST, DB_USER, DB_PASSWORD);
if (!$connection) {
  die('Not connected : ' . mysql_error());
}

// Set the active MySQL database
$db_selected = mysql_select_db(DB_NAME, $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
}



$query ="INSERT into audio (twilio_uri,local_uri,upload_status,log,phone_number,time) VALUES ('".$_REQUEST['RecordingUrl']."','','','','','".date("Y-m-d H:i:s")."')";
$result=mysql_query($query);




 header("content-type: text/xml");
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>

<Response>
    <Say>Thanks for leaving your story</Say>
    <Say>Goodbye.</Say>
</Response>