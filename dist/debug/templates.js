this['JST'] = this['JST'] || {};

this['JST']['app/templates/example.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<br/>\n  <div role="main" id="main" class=\'container well\'>\n    <h1>Zeega App Boilerplate</h1>\n    <p>Enter the url of a valid Zeega project<p>\n    <small>like: http://dev.zeega.org/joseph/web/api/projects/1280</small>\n    <div class="input-append">\n      <input class="span6 dataloc" id="appendedInputButton" size="16" type="text" placeholder=\'type here…\' value=\'http://dev.zeega.org/joseph/web/api/projects/1315\'><button id=\'submit-button\' class="btn" type="button">Go!</button>\n    </div>\n  </div>';
}
return __p;
};

this['JST']['app/templates/image.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<img src="'+
( attr.uri )+
'" width="100%"/>';
}
return __p;
};

this['JST']['app/templates/player.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'player-header player-overlay\'>\n\n';
 if( mode != 'standalone' ) { 
;__p+=' \n\t<a id=\'preview-close\' class=\'close pull-right\' href=\'\' >&times;</a>\n';
 } 
;__p+='\n\n';
 if( mode != 'embed' && fullscreenEnabled ) { 
;__p+='\n\t<a href=\'#\' class=\'fullscreen pull-right\' target=\'blank\'><i class=\'zicon-go-fullscreen\'></i></a>\n';
 } 
;__p+='\n\n';
 if( mode != 'editor' && social ) { 
;__p+='\n\t<a href=\'https://twitter.com/intent/tweet?original_referer='+
( url_base )+
''+
( id )+
'&text=Zeega%20Project%3A%20'+
( title )+
'&url='+
( url_base )+
''+
( id )+
'\' class=\'share-twitter pull-right\' target=\'blank\'><i class=\'zitem-twitter zitem-30 loaded\'></i></a>\n\t<a href=\'http://www.facebook.com/sharer.php?u='+
( url_base )+
''+
( id )+
'\' class=\'share-facebook pull-right\' target=\'blank\'><i class=\'zitem-facebook zitem-30 loaded\'></i></a>\n';
 } 
;__p+='\n\n</div>\n\n';
 if( branding ) { 
;__p+='\n<div class=\'player-zeega-icon player-overlay\'><a href=\''+
( url_base )+
'user/'+
( user_id )+
'\' target=\'blank\' class=\'zeega-user\'><i class=\'zitem-zeega00 zitem-30 loaded\'></i></a></div>\n';
 } 
;__p+='\n\n<div id=\'preview-left\' class=\'hidden preview-nav-arrow preview-nav\'>\n\t"<div class=\'arrow-background\'></div>\n</div>\n<div id=\'preview-right\' class=\'hidden preview-nav-arrow preview-nav\'>\n\t<div class=\'arrow-background\'></div>\n</div>\n<div id=\'preview-media\' ></div>\n<div id=\'loader-tray\' class=\'\'></div>\n\n';
 if( navbar_bottom ) { 
;__p+='\n\t<div class=\'zeega-player-menu menu-bottom\'>"\n\t\t<div id=\'citation-tray\' class=\'player-overlay\'></div>\n\t';
 if( playerCitation ) { 
;__p+='}\n\t\t<div id=\'player-citation\' class=\'player-overlay\'>\n\t\t';
 if( playerCitation ) { 
;__p+='\n\t\t\t<div class=\'player-citation\'><h3 class=\'title\'>'+
( title )+
'</h3></div>\n\t\t';
 } 
;__p+='\n\t\t</div>\t\t\t\n\t';
 } 
;__p+='\n';
 } 
;__p+='\n\n';
}
return __p;
};