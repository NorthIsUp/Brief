SCS.conv._nearBottom = function(){
  return (document.body.scrollTop+window.innerHeight >= document.body.scrollHeight-75);
};





var add_img_tags = function(message){
	var the_match = message.match(/([^"]http:\/\/[^<>]+\.(jpg|png|gif|jpeg))/gi)
	if (the_match)
	  return the_match.map(function(tm,i){
			return '<br /><img src="'+ tm.slice(1) + '" />'
		}).join('')
  else
    return ''
};

var add_twitter_img_tags = function(message){
	var the_match = message.match(/http:\/\/twitter\.com\/[^<>]+\/status(es)?\/([0-9]+)/)
	if (the_match && the_match.length > 2)
	  return '<br /><img src="http://twictur.es/i/' + the_match[2] + '.gif" />'
  else
    return ''
};

var add_sad_trombone = function(message) {
  var the_match = message.match(/sadtrombone|wah|womp/)
  if (the_match) {
    var embed = ' '
    embed += '<audio src="http://dl.dropbox.com/u/14572/steezy/Sad-Trombone.mp3" autoplay>'
    embed += 'SAD TROMBONE PLAYING FOR YOU'
    embed += '</audio>'
    return embed
  } else {
    return ''
  }
};

var add_haha = function(message) {
  var the_match = message.match(/HAHA/)
  if (the_match) {
    var embed = ' '
    embed += '<audio src="http://dl.dropbox.com/u/14572/steezy/haha.mp3" autoplay>'
    embed += 'NELSON SAYING HAHA'
    embed += '</audio>'
    return embed
  } else {
    return ''
  }
};

var add_emoticons = function(message) {
  var base = '<img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/'
  var end = '" />'
  var emoticonned = message
	  // .replace(/:'-?\\(/g, base + '20.gif' + end)
    // .replace(/:-?\\)/g, base + '1.gif' + end)
    // .replace(/:-?\\(/g, base + '2.gif' + end)
    // .replace(/:-?D/g, base + '4.gif' + end)
    // .replace(/8-?\\)/g, base + '16.gif' + end)
    .replace(/\*facepalm\*/g, '<br><img src="http://img.skitch.com/20081020-kqf6ar41tdrwiqp2k6ejhr3q3t.jpg" alt="facepalm">')
    .replace(/\dtmyk\d/ig, '<br><img src="http://img.skitch.com/20081202-mfnhnh9nursmcs2fb8smj6w94q.jpg" alt="tmyk">')
    .replace(/the more you know/gi, '<br><img src="http://img.skitch.com/20081202-nr24rt47pu6d26y3qnmu994cha.jpg" alt="the more you know">')
    .replace(/8=+(>|D)/g, '<br><img src="http://img.skitch.com/20080801-f2k6r13iaw7xsrya39ftamugaa.png" />')
    .replace(/(DERP[!1]+)/g, '<br><img src="http://img.skitch.com/20080801-ehk4xc8n65xdx2sndc4scckyf2.jpg" alt="$1"/>')
    .replace(/^\*?ba+r+f+s*\*?/g, '<br><img src="http://img.skitch.com/20080808-t8shmyktk66i65rx425jgrrwae.jpg" alt="Achewood - October 3, 2006"/>')
    .replace(/do not want|\bdnw\b/gi, '<br><img src="http://img.skitch.com/20081031-1tt6dpsq42p85i2472xmc3yped.jpg" />')
    .replace(/\bodb\b/gi, '<br><img src="http://img.skitch.com/20081211-gwjfs9q8gcqjdq3sn6w13bd4at.jpg" alt="oh baby I like it raw"/>')
  return emoticonned
};

var add_youtube_embeds = function(message){
              var regex = /.*youtube\.com\/watch\?v=([a-zA-Z0-9\-]+).*?/;
  var the_match = message.match(regex);
  if (the_match) {
    embed  = '<br />'
    embed += '<object width="425" height="344">'
    embed += '<param name="movie" value="http://www.youtube.com/v/' + the_match[1] + '&fs=1">'
    embed += '</param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param>'
    embed += '<embed src="http://www.youtube.com/v/' + the_match[1] + '&hl=en&fs=1" type="application/x-shockwave-flash" allowfullscreen="true" width="425" height="344"></embed>'
    embed += '</object>'
	  return embed
  } else {
    return ''
  }
};

var add_vimeo_embeds = function(message) {
  var the_match = message.match(/vimeo.com\/\d{1,}/)
  if (the_match) {
    var id = the_match.toString().split('/')[1]
    embed = '<br />'
    embed += '<object width="501" height="334">'
    embed += '<param name="allowfullscreen" value="true" />'
    embed += '<param name="allowscriptaccess" value="always" />'
    embed += '<param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=' + id
    embed += '&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=a60011&amp;fullscreen=1" />'
    embed += '<embed src="http://vimeo.com/moogaloop.swf?clip_id=' + id
    embed += '&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=a60011&amp;fullscreen=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="501" height="334"></embed></object>'
    return embed
  } else {
    return ''
  }
};

var add_gists = function(message) {
  var the_match = message.match(/https?:\/\/gist\.github\.com\/\w{1,}/);
  if (the_match) {
    embed = "<br />"
    embed += '<iframe width="100%" frameborder="0" src="' + the_match[0] + '.pibb" />'
    return embed
  } else {
    return ''
  }
};

var add_swiper = function(message) {
  // see if the person is calling out swiper
  var the_match = message.match(/swiper:\ ((\w|\s){1,})/i);
  if (the_match) {
    // if so, get the text after the callout
    var raw = the_match[1];
    // see if the person is requesting an image of swiper
    // if (raw.match(/image|img/)) {
      // if so, get rid of "image" and strip whitespace
      var term = raw.replace('image','').replace('img','').replace(/^\s+|\s+$/g,"");
      // call the swiper service
      var embed = '<br>';
      embed += '<img style="max-width:500px;height:auto" src="http://floating-earth-914.heroku.com/image/' + term + '">';
      return embed;
    // } else {
      // return '';
    // }
  } else {
    return '';
  }
}



var oldAppendItem = SCS.conv.appendItem;
SCS.conv.appendItem = function(html, scroll){
  var extras = add_img_tags(html)
             + add_twitter_img_tags(html)
             + add_youtube_embeds(html)
             + add_vimeo_embeds(html)
             + add_sad_trombone(html)
             + add_haha(html)
             + add_swiper(html)
             // + add_emoticons(html)
             + add_gists(html);

  html = html.replace(/(<div class="body">.+)(<\/div>)/, "$1" + extras + "$2");

  return oldAppendItem(html, scroll);
};

