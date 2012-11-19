

<?php

require("phpsqlajax_dbinfo.php");
$connection=mysql_connect (DB_HOST, DB_USER, DB_PASSWORD);
if (!$connection) {
  die('Not connected : ' . mysql_error());
}

// Set the active MySQL database
$db_selected = mysql_select_db(DB_NAME, $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
}



$result=mysql_query("SELECT * FROM audio ORDER BY id DESC");

echo "<h1>Planet Takeout Call Log</h1><ul>";
if(mysql_num_rows($result)>0){
	

	while($audio = @mysql_fetch_assoc($result)){
		echo "<li>Call ".$audio['id']." made on ".$audio['time']."  :: <a target='_blank' href='".$audio['twilio_uri']."'>link</a></li>";

	}
}

echo "</ul>";
?>