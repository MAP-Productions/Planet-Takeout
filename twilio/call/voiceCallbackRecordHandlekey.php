<?php
 
    // if the caller pressed anything but 1 send them back
    if($_REQUEST['Digits'] != '1') 
	{
        header("Location: voiceCallbackRecord.php");
        die;
    }
     
    // the user pressed 1, connect the call to 310-555-1212 
    header("content-type: text/xml");
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<Response>
    <Record action="http://mlhplayground.org/twilio-playground/gsd-alumni-talk/voiceCallbackRecordEnded.php"/>
</Response>