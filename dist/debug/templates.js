this['JST'] = this['JST'] || {};

this['JST']['app/templates/about.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'left-column\'>\n\t<h5>About</h5>\n\t<ul>\n\t\t<li><a href=\'#\'>Who We Are</a></l1>\n\t\t<li><a href=\'#\'>Blog</a></l1>\n\t\t<li><a href=\'#\'>Scavenger Hunt</a></l1>\n\t\t<li><a href=\'#\'>Podcasts</a></l1>\n\t</ul>\n\t<strong>Contact:</strong>\n\t<br/>\n\t<a href="mailto:val@planettakeout.com" target=\'blank\'>val@planettakeout.com</a>\n</div>\n\n<div class=\'right-column\'>\n\t<p>\n\t\tPlanet Takeout is a participatory documentary project about the Chinese takeout as a vital cultural crossroads in Boston and beyond. The radio and multimedia project aims to turn local Chinese takeouts into spaces for community storytelling and to use the stories as lenses into both the local neighborhood and into global immigration patterns to the city. || We want to hear your story about Chinese takeouts. Is there a takeout you’re a regular at? Do you remember the first time you had Chinese takeout food? Please call our Planet Takeout call-in line and tell us a story: 617.477.8688. It’s free in the Boston area and the recording explains what to do.\n\t</p>\n\t<p>\n\t\tProduced by Val Wang and brought to you by WGBH 89.7 and Zeega. Planet Takeout is part of a nationwide initiative, Localore, produced by the Association of Independents in Radio with funding from the Corporation for Public Broadcasting.\n\t</p>\n\n</div>\n\n<div class=\'sponsor-drawer\'>\n\t<ul>\n\t\t<li><a href=\'#\'><img src=\'assets/img/logo_wgbh.png\'/></a></l1>\n\t\t<li><a href=\'#\'><img src=\'assets/img/logo_localore.png\'/></a></l1>\n\t\t<li><a href=\'#\'><img src=\'assets/img/logo_air.png\'/></a></l1>\n\t\t<li><a href=\'#\'><img src=\'assets/img/logo_cpb.png\'/></a></l1>\n\t\t<li><a href=\'#\'><img src=\'assets/img/logo_artworks.jpg\'/></a></l1>\n\t\t<li><a href=\'#\'><img src=\'assets/img/logo_wyncote.png\'/></a></l1>\n\t\t<li><a href=\'#\'><img src=\'assets/img/logo_macarthur.png\'/></a></l1>\n\t\t<li><a href=\'#\'><img src=\'assets/img/logo_zeega.png\'/></a></l1>\n\t</ul>\n\n</div>';
}
return __p;
};

this['JST']['app/templates/base.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id=\'nav-upper\'></div>\n<div id=\'nav-lower\'></div>\n<div id=\'app-base\'></div>';
}
return __p;
};

this['JST']['app/templates/citation.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'citation-top clearfix\'>\n\t<h2 class=\'citation-title pull-left\'>'+
( attr.title )+
'</h2>\n\t<div class=\'citation-attribution pull-left\'>by kellyisawesome via <a href=\'#\' target=\'blank\'>flickr</a></div>\n\t<div class=\'citation-geo pull-right\'><a href=\'#\'>Yum Mee</a> 160 Columbus Ave, Boston, MA <i class=\'icon-map-marker icon-white\'></i></div>\n</div>\n<div class=\'citation-bottom\'>\n\t<div class=\'pull-left\'>Tidbits > Exteriors</div>\n</div>';
}
return __p;
};

this['JST']['app/templates/collection.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href=\'/collections/'+
( id )+
'\'>\n\t<div class=\'item-title\' style=\'background:url('+
( thumbnail_url )+
');background-size:100% 100%;\'><h1>'+
( title )+
'</h1></div>\n</a>';
}
return __p;
};

this['JST']['app/templates/example.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<br/>\n\n<div role="main" id="main" class=\'container well\'>\n<h1>Zeega App Boilerplate</h1>\n<p>Enter the url of a valid Zeega project<p>\n<small>like: http://dev.zeega.org/joseph/web/api/projects/1280</small>\n<div class="input-append">\n  <input class="span6 dataloc" id="appendedInputButton" size="16" type="text" placeholder=\'type here…\' value=\'http://dev.zeega.org/joseph/web/api/projects/1316\'><button id=\'submit-button\' class="btn" type="button">Go!</button>\n</div>\n</div>';
}
return __p;
};

this['JST']['app/templates/item.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href=\'/collections/'+
( collection_id )+
'/view/'+
( id )+
'\'>\n\t<div class=\'item-title\' style=\'background:url('+
( thumbnail_url )+
');background-size:100% 100%;\'><h1>'+
( title )+
'</h1></div>\n</a>';
}
return __p;
};

this['JST']['app/templates/layouts/citation-drawer-layout.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this['JST']['app/templates/layouts/collection-grid-layout.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id=\'grid-view-wrapper\'>\n\t<div id=\'grid-view-slider\'>\n\t\t<div class=\'grid-view-title\'>\n\t\t\t<h2>Planet Takeout is a participatory documentary project about the Chinese takeout as a vital cultural crossroads in Boston and beyond.</h2>\n\t\t</div>\n\t\t<ul class=\'list clearfix\'></ul>\n\t</div>\n</div>';
}
return __p;
};

this['JST']['app/templates/layouts/item-grid-layout.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id=\'grid-view-wrapper\'>\n\t<div id=\'grid-view-slider\'>\n\t\t<div class=\'grid-view-title\'>\n\t\t\t<h1>'+
( title )+
'</h1>\n\t\t</div>\n\t\t<ul class=\'list clearfix\'></ul>\n\t</div>\n</div>';
}
return __p;
};

this['JST']['app/templates/layouts/modal-wide.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'PT-modal PT-modal-wide\'>\n\t<div class=\'PT-modal-title\'><h1>'+
( title )+
'</h1></div>\n\t<div class=\'PT-modal-content-wrapper clearfix\'>\n\t\t<div class=\'PT-modal-content-head\'><button class="close close-modal">&times;</button></div>\n\t\t<div class=\'PT-modal-content\'></div>\n\t</div>\n</div>\n';
}
return __p;
};

this['JST']['app/templates/layouts/modal.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'PT-modal\'>\n\t<div class=\'PT-modal-title\'><h1>'+
( title )+
'</h1></div>\n\t<div class=\'PT-modal-content-wrapper clearfix\'>\n\t\t<div class=\'PT-modal-content-head\'><button class="close close-modal">&times;</button></div>\n\t\t<div class=\'PT-modal-content\'></div>\n\t</div>\n</div>\n';
}
return __p;
};

this['JST']['app/templates/map.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id=\'PT-map\'>map goes here</div>';
}
return __p;
};

this['JST']['app/templates/menu.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'PT-menu-column\'>\n\t<h2>Tidbits</h2>\n\t<img src=\'assets/img/menu_platter.png\' width=\'100px\'/>\n\t<img src=\'assets/img/menu_rose.png\'  width=\'100px\'/>\n</div>\n\n<div class=\'PT-menu-column\'>\n\t<h2>Stories</h2>\n\t<img src=\'assets/img/menu_flourish.png\'/>\n</div>\n\n<div class=\'PT-menu-column\'>\n\t<h2>Takeouts</h2>\n\t<img src=\'assets/img/menu_chef.png\' width=\'100px\'/>\n\t<img src=\'assets/img/menu_junk.png\' width=\'100px\'/>\n</div>\n';
}
return __p;
};

this['JST']['app/templates/participate-0.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div><h5>Add a new Takeout Add photos, videos & sounds Tell your story</h5></div>\n<div class=\'left-column\'>\n\ttakeout name\n\taddress\n</div>\n<div class=\'right-column\'>\n\t<button class=\'btn\'>Find <i class=\'icon-search\'></i></button>\n</div>';
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
;__p+='\n\n</div><!-- .player-header -->\n\n';
 if( branding ) { 
;__p+='\n<div class=\'player-zeega-icon player-overlay\'><a href=\''+
( url_base )+
'user/'+
( user_id )+
'\' target=\'blank\' class=\'zeega-user\'><i class=\'zitem-zeega00 zitem-30 loaded\'></i></a></div>\n';
 } 
;__p+='\n\n<div id=\'preview-left\' class=\'hidden preview-nav-arrow preview-nav\'>\n\t<div class=\'arrow-background\'></div>\n</div>\n<div id=\'preview-right\' class=\'hidden preview-nav-arrow preview-nav\'>\n\t<div class=\'arrow-background\'></div>\n</div>\n<div id=\'preview-media\' ></div>\n<div id=\'loader-tray\' class=\'\'></div>\n\n';
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

this['JST']['app/templates/upper-nav.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<li><a href="about"><img class=\'pt-logo\' src="assets/img/pt_logo-white.png"/></a></li>\n<li><a href="collections"><img class=\'nav-icon\' src="assets/img/icon_grid.png"/></a></li>\n<li><a href="map"><img class=\'nav-icon\' src="assets/img/icon_map.png"/></a></li>\n<li><a href="participate"><img class=\'nav-icon\' src="assets/img/icon_comment.png"/></a></li>\n<li><a href="menu"><img class=\'nav-icon\' src="assets/img/icon_menu.png"/></a></li>\n<li><a href="search"><img class=\'nav-icon\' src="assets/img/icon_search.png"/></a></li>';
}
return __p;
};