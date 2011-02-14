// todo
// keyboard command and maybe a click area to clear the whole convo
// click to toggle image display


SCS.conv._nearBottom = function(){
  return (document.body.scrollTop+window.innerHeight >= document.body.scrollHeight-75);
};

var oldAppendItem = SCS.conv.appendItem;
SCS.conv.appendItem = function(html, scroll){
  if (!scroll) return oldAppendItem(html, scroll);

  var matchHtml = html.replace(/<[^>]+>/g,' ').replace(/#\!\//,''),
      urlMatch = matchHtml.match(/(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?[\/?=\w\.\-_]*/ig),
      wrapper = new Element('div', {'html': html}),
      element = wrapper.getFirst(),
      elementBody = element.getElement('div.body');

  elementBody.set('html',
    add_emoticons(elementBody.get('html')) + add_haha(elementBody.get('html')) + add_sad_trombone(elementBody.get('html')) + add_swiper(elementBody.get('html'), wrapper)
  );

  if (urlMatch){
    var id = element.get('id'),
    embedId = id + '-embed',
    embedZone = new Element('div', {id: embedId, html: 'Loading...'});

    elementBody.grab(embedZone);

    urlMatch.each(function(url){
      new Request.JSONP({
        url: 'http://api.embed.ly/1/oembed',
        data: {
          url: url,
          maxheight: 800,
          maxwidth: 600
        },
        onComplete: function(data){
          var elem = document.id(embedId);
          if (elem.get('html').test(/Loading/)) elem.set('html','');
          if (['video','rich'].contains(data.type))
            elem.set('html', elem.get('html') + data.html);
          else if (data.type == 'photo')
            elem.set('html', elem.get('html') + '<img src="' + data.url + '">');
        }
      }).send();
    });
  }
  return oldAppendItem(wrapper.get('html'), scroll);
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
    .replace(/facepalm/g, '<br><img src="http://img.skitch.com/20081020-kqf6ar41tdrwiqp2k6ejhr3q3t.jpg" alt="facepalm">')
    .replace(/\dtmyk\d/ig, '<br><img src="http://img.skitch.com/20081202-mfnhnh9nursmcs2fb8smj6w94q.jpg" alt="tmyk">')
    .replace(/the more you know/gi, '<br><img src="http://img.skitch.com/20081202-nr24rt47pu6d26y3qnmu994cha.jpg" alt="the more you know">')
    .replace(/8=+(>|D)/g, '<br><img src="http://img.skitch.com/20080801-f2k6r13iaw7xsrya39ftamugaa.png" />')
    .replace(/(DERP[!1]+)/g, '<br><img src="http://img.skitch.com/20080801-ehk4xc8n65xdx2sndc4scckyf2.jpg" alt="$1"/>')
    .replace(/^\*?ba+r+f+s*\*?/g, '<br><img src="http://img.skitch.com/20080808-t8shmyktk66i65rx425jgrrwae.jpg" alt="Achewood - October 3, 2006"/>')
    .replace(/do not want|\bdnw\b/gi, '<br><img src="http://img.skitch.com/20081031-1tt6dpsq42p85i2472xmc3yped.jpg" />')
    .replace(/\bodb\b/gi, '<br><img src="http://img.skitch.com/20081211-gwjfs9q8gcqjdq3sn6w13bd4at.jpg" alt="oh baby I like it raw"/>')
  return emoticonned
};

SCS.swiper = 'yes';

var add_swiper = function(message, html) {
  var the_match = message.match(/swiper:\ (.*)/i);
  if (the_match) {
    var term = the_match[1].clean(),
        sender = html.getElement('.sender').get('text').toLowerCase(),
        embed = '',
        current_user = html.getElement('.item').hasClass('out');

    if (term.test('no swiping','i') && current_user) {
      SCS.swiper = 'no';
      embed += '<br>awww maannnn!!';
    } else if (term.test('start swiping','i') && current_user) {
      SCS.swiper = 'yes';
      embed += '<br>swiper now swiping!';
    } else if (SCS.swiper === 'no') {
      embed += ': <a href="http://floating-earth-914.heroku.com/image/' + term + '">(view swiped image)</a>';
    } else {
      if (term.test(/no swiping|start swiping/)) {
        embed += '';
      } else {
        embed += '<br><img style="max-width:500px;height:auto" src="http://floating-earth-914.heroku.com/image/' + term + '?sender=' + sender + '">';
      }
    }
    return embed;
  } else {
    return '';
  }
}

window.addEvent('domready', function(){
  document.id('conversation').addEvent('click:relay(div.body img)', function(){
    this.setStyle('display','none')
  })
})
