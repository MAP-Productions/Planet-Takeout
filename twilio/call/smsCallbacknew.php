<?php
    /* Include the Twilio PHP library */
    require "../twilio/Services/Twilio.php";
    
	$callTo = htmlspecialchars($_REQUEST['From']);
 	$smsBody = htmlspecialchars($_REQUEST['Body']);
	
    /* Twilio REST API version */
    $ApiVersion = "2010-04-01";
 
    /* Set our AccountSid and AuthToken */
    $AccountSid = "AC0909d6e768cfc812f33c6fcebddba951";
    $AuthToken = "29f1cfaaf236c5a22f36bfc89acaf14f";
     
    // Outgoing Caller ID you have previously validated with Twilio 
    $callFrom = '6175007254';
     
    /* Instantiate a new Twilio Rest Client */
	$url = 'http://mlhplayground.org/twilio-playground/gsd-alumni-talk/voiceCallbackRecord.php';

	/* Instantiate a new Twilio Rest Client */
	$client = new Services_Twilio($AccountSid, $AuthToken);

	/* make Twilio REST request to initiate outgoing call */
	$call = $client->account->calls->create($callFrom, $callTo, $url);  
?>