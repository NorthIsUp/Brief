SCS.conv._nearBottom = function(){
  return (document.body.scrollTop+window.innerHeight >= document.body.scrollHeight-75);
};

var oldAppendItem = SCS.conv.appendItem;
SCS.conv.appendItem = function(html, scroll){

  var urlMatch = html.match(/(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?[\/\w\.-_]*/i);
  if (urlMatch){
    var wrapper = new Element('div', {'html': html}),
        element = wrapper.getFirst(),
        elementBody = element.getElement('div.body'),
        id = element.get('id'),
        embedId = id + '-embed',
        embedZone = new Element('div', {id: embedId, html: 'Loading...'});

    elementBody.grab(embedZone);
    html = wrapper.get('html');

    new Request.JSONP({
      url: 'http://api.embed.ly/1/oembed',
      data: { 
        url: urlMatch[0],
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
  }

  return oldAppendItem(html, scroll);
};

