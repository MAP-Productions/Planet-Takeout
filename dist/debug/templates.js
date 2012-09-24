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

this['JST']['app/templates/citation-player.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'citation-top clearfix\'>\n\t<a href=\'#\' class=\'play-pause pull-left\'><i class=\'PT-icon-pause\'></i></a>\n\t<h2 class=\'citation-title pull-left\'>'+
( attr.title )+
'</h2>\n\t<div class=\'citation-attribution pull-left\'>by '+
( attr.media_creator_realname )+
' via <a href=\''+
( attr.attribution_uri )+
'\' target=\'blank\'>'+
( attr.archive )+
'</a></div>\n\t<div class=\'citation-geo pull-right\'><a href=\'#\'>'+
( attr.location )+
'</a> '+
( attr.location )+
' <i class=\'icon-map-marker icon-white\'></i></div>\n</div>\n<div class=\'citation-bottom\'>\n\t<div class=\'pull-left\'>Tidbits > Exteriors</div>\n</div>';
}
return __p;
};

this['JST']['app/templates/citation-static.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'citation-top clearfix\'>\n\t<h2 class=\'citation-title pull-left\'>'+
( attr.title )+
'</h2>\n\t<div class=\'citation-attribution pull-left\'>by '+
( attr.media_creator_realname )+
' via <a href=\''+
( attr.attribution_uri )+
'\' target=\'blank\'>'+
( attr.archive )+
'</a></div>\n\t<div class=\'citation-geo pull-right\'><a href=\'#\'>'+
( attr.location )+
'</a> '+
( attr.location )+
' <i class=\'icon-map-marker icon-white\'></i></div>\n</div>\n<div class=\'citation-bottom\'>\n\t<div class=\'pull-left\'>Tidbits > Exteriors</div>\n</div>';
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
__p+='<div class=\'citation-wrapper\'>\n\t<div class=\'nav-controls clearfix\'></div>\n\t<div class=\'citation-inner clearfix\'></div>\n</div>';
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
__p+='<div class=\'leaflet-map\' id=\'PT-map\'>map goes here</div>';
}
return __p;
};

this['JST']['app/templates/menu.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'PT-menu-column\'>\n\t<h2>Tidbits</h2>\n\t<ul class="menu-items">\n\t\t<li>\n\t\t\t<a href="#">Lucky Animal</a>\n\t\t\t<span>121</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Gumball Machine</a>\n\t\t\t<span>118</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Exterior</a>\n\t\t\t<span>89</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Fortune</a>\n\t\t\t<span>89</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Neon</a>\n\t\t\t<span>72</span>\n\t\t</li>\n\t</ul>\n\t<img class="flourish" src=\'assets/img/menu_platter.png\' width=\'77px\'/>\n\t<h3>All Tidbits</h3>\n\t<ul class="menu-items">\n\t\t<li>\n\t\t\t<a href="#">Delivery</a>\n\t\t\t<span>55</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Snow</a>\n\t\t\t<span>47</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Plows</a>\n\t\t\t<span>43</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Summershack</a>\n\t\t\t<span>43</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Snow</a>\n\t\t\t<span>47</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Plows</a>\n\t\t\t<span>43</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Summershack</a>\n\t\t\t<span>43</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">This</a>\n\t\t\t<span>47</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">That</a>\n\t\t\t<span>47</span>\n\t\t</li>\n\t</ul>\n\t<img class="flourish" src=\'assets/img/menu_rose.png\'  width=\'75px\'/>\n\t<ul class="menu-items">\n\t\t<li>\n\t\t\t<a href="#">Uncle</a>\n\t\t\t<span>7</span>\n\t\t</li>\n\t</ul>\n</div>\n\n<div class=\'PT-menu-column\'>\n\t<h2>Stories</h2>\n\t<h3>Running a Takeout</h3>\n\t<ul class="menu-items">\n\t\t<li>\n\t\t\t<a href="#">Getting Access</a>\n\t\t\t<span>6:32</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Restaurant English</a>\n\t\t\t<span>4:32</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">A Day In The Life</a>\n\t\t\t<span>7:57</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Learning Restaurant English</a>\n\t\t\t<span>2:21</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Robbed at Gunpoint</a>\n\t\t\t<span>5:17</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Making Crab Rangoon</a>\n\t\t\t<span>4:22</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">The Broken Window</a>\n\t\t\t<span>3:13</span>\n\t\t</li>\n\t</ul>\n\t<h3>Regulars</h3>\n\t<ul class="menu-items">\n\t\t<li>\n\t\t\t<a href="#">Regulars</a>\n\t\t\t<span>5:19</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Food Wall Fanatics</a>\n\t\t\t<span>4:50</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Barflys</a>\n\t\t\t<span>3:57</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Teenagers</a>\n\t\t\t<span>6:19</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Homeless Men</a>\n\t\t\t<span>7:20</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">A Favorite Deliveryman</a>\n\t\t\t<span>5:15</span>\n\t\t</li>\n\t</ul>\n\t<img class="flourish" src=\'assets/img/menu_flourish.png\' width="237px" />\n\t<h3>Neighbors</h3>\n\t<ul class="menu-items">\n\t\t<li>\n\t\t\t<a href="#">Starting a Takeout</a>\n\t\t\t<span>5:15</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Neighborhood Relations</a>\n\t\t\t<span>5:15</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Giving Back</a>\n\t\t\t<span>5:15</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">What is Jamaica Plain</a>\n\t\t\t<span>5:15</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Who is Alan</a>\n\t\t\t<span>5:15</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Takeouts En Español</a>\n\t\t\t<span>5:15</span>\n\t\t</li>\n\t</ul>\n\t<h3>Generations</h3>\n\t<ul class="menu-items">\n\t\t<li>\n\t\t\t<a href="#">Generations</a>\n\t\t\t<span>4:23</span>\n\t\t</li>\n\t</ul>\n</div>\n\n<div class=\'PT-menu-column\'>\n\t<h2>Takeouts</h2>\n\t<ul class="menu-items specials">\n\t\t<li>\n\t\t\t<a href="#">Delivery</a>\n\t\t\t<span>55</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Snow</a>\n\t\t\t<span>47</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Plows</a>\n\t\t\t<span>43</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Summershack</a>\n\t\t\t<span>43</span>\n\t\t</li>\n\t</ul>\n\t<img class="flourish" src=\'assets/img/menu_chef.png\' width=\'77px\'/>\n\t<h3>By Neighborhood</h3>\n\t<ul class="menu-items">\n\t\t<li>\n\t\t\t<a href="#">Allston/Brighton</a>\n\t\t\t<span>12</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Back Bay/Fenway</a>\n\t\t\t<span>7</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Chinatown</a>\n\t\t\t<span>4</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Fields Corner</a>\n\t\t\t<span>8</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Hyde Park</a>\n\t\t\t<span>13</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Beacon Hill</a>\n\t\t\t<span>3</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Brookline</a>\n\t\t\t<span>9</span>\n\t\t</li>\n\t</ul>\n\t<img class="flourish" src=\'assets/img/menu_junk.png\' width=\'77px\'/>\n\t<ul class="menu-items">\n\t\t<li>\n\t\t\t<a href="#">Cambridge</a>\n\t\t\t<span>11</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Charlestown</a>\n\t\t\t<span>20</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Dorchester</a>\n\t\t\t<span>31</span>\n\t\t</li>\n\t\t<li>\n\t\t\t<a href="#">Jamaica Plain</a>\n\t\t\t<span>8</span>\n\t\t</li>\n\t</ul>\n</div>\n';
}
return __p;
};

this['JST']['app/templates/participate-0.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="participate-tabs-head">\n\t<li class="active">Add a new Takeout</li>\n\t<li>Add photos, videos & sounds</li>\n\t<li>Tell your story</li>\n\t<li>Stay in touch</li>\n</ul>\n<div class="participate-tab" id="addTakeout">\n\t<div id=\'stepOne\'>\n\t\t<input placeholder="Takeout name" type="text" id="takeoutName" />\n\t\t<input placeholder="Address" type="text" id="takeoutAddress" />\n\t\t<button id=\'findTakeout\' class=\'btn\'>Find <i class=\'icon-search\'></i></button>\n\t</div>\n\t<div id="stepTwo" style="display: none;">\n\t\t<div id="streetView" style="width: 510px; height: 370px;"></div>\n\t\t<p class="explanation">Use your mouse to move Streetview to the best frame.</p>\n\t\t<button id=\'savePov\' class=\'btn\'>Submit</button>\n\t</div>\n\t<div id="thanks" style="display: none;">\n\t\t<h1>Thanks for submitting <strong id="takeoutName"></strong>!.</h1>\n\t</div>\n</div>\n<div class="participate-tab" id="addPhotos" style="display: none;">\n\t<h2>Tag them as you take them!</h2>\n\t<div class="left-column">\n\t\t<span class="social-icon camera section-icon"></span>\n\t\t<ol>\n\t\t\t<li>Upload your media to <a href="http://www.flickr.com/">Flickr</a>, <a href="http://www.youtube.com/">Youtube</a>, <a href="http://www.tumblr.com/">Tumblr</a> or <a href="http://www.soundcloud.com/">Soundcloud</a></li>\n\t\t\t<li>Tag <strong>#planettakeout</strong> and other descriptive tags</li>\n\t\t\t<li>Geolocate or include the takeout name and location</li>\n\t\t</ol>\n\t\t<h2>Add them to our Facebook Wall!</h2>\n\t\t<span class="social-icon facebook section-icon"></span>\n\t\t<ol>\n\t\t\t<li>Visit our <a href="#">facebook page</a>.</li>\n\t\t\t<li>Add your photo or video.</li>\n\t\t\t<li>Include the name and location.</li>\n\t\t</ol>\n\t\t<h2>Email them!</h2>\n\t\t<span class="social-icon email section-icon"></span>\n\t\t<ol>\n\t\t\t<li>Email val@planettakeout.org with your photos or mp3s as attachments.</li>\n\t\t\t<li>Be sure to tell us the location, takeout name, and any other fun facts.</li>\n\t\t</ol>\n\t</div>\n\t<div class="right-column">\n\t\t<ul class="info-tab-icons">\n\t\t\t<li class="social-icon flickr"></li>\n\t\t\t<li class="social-icon youtube"></li>\n\t\t\t<li class="social-icon tumblr"></li>\n\t\t\t<li class="social-icon soundcloud"></li>\n\t\t</ul>\n\t\t<div class="info-tab default">\n\t\t\t<p>Select an icon above for detailed instructions</p>\n\t\t</div>\n\t\t<div class="info-tab media flickr" style="display: none;">\n\t\t\t<span class="carat"></span>\n\t\t\t<div class="content">\n\t\t\t\t<p>1) Login or create an account (it’s quick and free)</p>\n\t\t\t\t<p>2) Join the Planet Takeout group</p>\n\t\t\t\t<p>3) Upload your photographs</p>\n\t\t\t\t<p>4) Tag Your Photos with planettakeout and the name of the takeout. If the name is two words, be sure to put the name in quotations (i.e. “Peking House”)</p>\n\t\t\t\t<p>This step is really important. If you don’t tag your photos properly, we will not be able to display them on our site.</p>\n\t\t\t\t<p>Also tag any words you feel describe the image or videos (e.g. fortune, waiting, altar). These tags open up new collections and views!</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="info-tab media youtube" style="display: none;">\n\t\t\t<span class="carat"></span>\n\t\t\t<div class="content">\n\t\t\t\t<p>Youtube info</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="info-tab media tumblr" style="display: none;">\n\t\t\t<span class="carat"></span>\n\t\t\t<div class="content">\n\t\t\t\t<p>Tumblr info</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="info-tab media soundcloud" style="display: none;">\n\t\t\t<span class="carat"></span>\n\t\t\t<div class="content">\n\t\t\t\t<p>Soundcloud info</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<div class="participate-tab" id="tellStory" style="display: none;">\n\t<h2>We want to hear your story about Chinese takeouts.</h2>\n\t<p>We are looking for everyday stories of how your local takeout fits into your life</p>\n\t<ol>\n\t\t<li>What did you order today? Do you always order the same dish?</li>\n\t\t<li>Is this takeout a part of your life or routine? How so?</li>\n\t\t<li>What is your relationship like with the takeout staff?</li>\n\t\t<li>Do you have childhood memories of eating Chinese takeout food?</li>\n\t</ol>\n\t<h2>We\'d love to hear your voice!</h2>\n\t<p><button class="btn">Record</button> Or call 617.477.8688</p>\n\t<p class="small">Click the “Record” button to begin recording. A SoundCloud account and the Flash plug-in are required. If you don’t yet have a SoundCloud account, you’ll have the opportunity to create one during the process.</p>\n</div>\n<div class="participate-tab" id="keepInTouch" style="display: none;">\n\t<h2>Like Us on Facebook</h2>\n\t<p>Facebook like embed here</p>\n\t<h2>Sign Up for Exclusive Emails</h2>\n\t<p>Receive the latest updates and exclusive stories from Planet Takeout</p>\n\t<input placeholder="Your email" type="text" id="email" />\n\t<button type="submit" name="planetTakeoutEmailSignup-1347988840500" id=\'submitEmail\' class=\'btn\'>Submit</button>\n</div>';
}
return __p;
};

this['JST']['app/templates/player-navigation.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href=\'#\' id=\'PT-preview-left\'>\n\t<img src=\'assets/img/arrow-right.png\' style=\'-webkit-transform:rotate(180deg)\'/>\n</a>\n<a href=\'#\' id=\'PT-preview-right\'>\n\t<img src=\'assets/img/arrow-right.png\'/>\n</a>\n';
}
return __p;
};

this['JST']['app/templates/player.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'player-header player-overlay\'>\n\n';
 if( mode != 'standalone' && chromeless == false ) { 
;__p+=' \n\t<a id=\'preview-close\' class=\'close pull-right\' href=\'\' >&times;</a>\n';
 } 
;__p+='\n\n';
 if( mode != 'embed' && fullscreenEnabled && chromeless == false) { 
;__p+='\n\t<a href=\'#\' class=\'fullscreen pull-right\' target=\'blank\'><i class=\'zicon-go-fullscreen\'></i></a>\n';
 } 
;__p+='\n\n';
 if( mode != 'editor' && social  && chromeless == false) { 
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
 if( branding && chromeless == false ) { 
;__p+='\n<div class=\'player-zeega-icon player-overlay\'><a href=\''+
( url_base )+
'user/'+
( user_id )+
'\' target=\'blank\' class=\'zeega-user\'><i class=\'zitem-zeega00 zitem-30 loaded\'></i></a></div>\n';
 } 
;__p+='\n\n';
 if( chromeless == false ) { 
;__p+='\n\t<div id=\'preview-left\' class=\'hidden preview-nav-arrow preview-nav\'>\n\t\t<div class=\'arrow-background\'></div>\n\t</div>\n\t<div id=\'preview-right\' class=\'hidden preview-nav-arrow preview-nav\'>\n\t\t<div class=\'arrow-background\'></div>\n\t</div>\n\n';
 } 
;__p+='\n\n<div id=\'preview-media\' ></div>\n<div id=\'loader-tray\' class=\'\'></div>\n\n';
 if( navbar_bottom && chromeless == false ) { 
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