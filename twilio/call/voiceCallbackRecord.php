<?php
    header("content-type: text/xml");
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<Response>    
	<Play>http://planettakeout.org/twilio/call/audio_prompt.mp3</Play>
	<Record action="http://planettakeout.org/twilio/call/voiceCallbackRecordEnded.php"/>
</Response>
