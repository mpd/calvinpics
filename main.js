dojo.require('dojo.NodeList-manipulate');
dojo.require('dojo.io.script');

dojo.addOnLoad(function() {
 hideOverlay();
 updateSwatch('blue');
 dojo.query('body').connect('onclick', onBodyClick);
});

function showOverlay() {
  dojo.style('overlay', 'display', '');
}

function hideOverlay() {
  dojo.style('overlay', 'display', 'none');
};

function updateSwatch(color) {
  dojo.style('swatch-color', 'background-color', color);
  dojo.style('swatch-name', 'color', color);
  var x = dojo.query('#swatch-name');
  x.text(color);
};

function onBodyClick(e) {
  console.log(e);
  loadPhoto(e.clientX, e.clientY);
};

function getPhotoUrl(photo) {
  return 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + 'm.jpg';
};

var LAST = 0;
function onPhotoLoaded(data, x, y) {
  if (!data.stat == 'ok') {
    alert('problem! go get daddy!');
  }

  var photo = data.photos.photo[LAST++];
  var url = getPhotoUrl(photo);
  var img = dojo.create('img', { src : url }, dojo.body());
  dojo.style(img, {
    position: 'absolute',
    left: x,
    top: y 
  });
}

function loadPhoto(x, y) {
  var d = dojo.io.script.get({
    url: 'http://api.flickr.com/services/rest/',
    callbackParamName: 'jsoncallback',
    content: {
      method: 'flickr.photos.search',
      format: 'json',
      api_key: '779f7b23254bd59ccc484824b5d1ff95',
      text: 'excavator blue',
      safe_search: '1',
      content_type: '1'
    }
  });
  d.addCallback(function(data) {onPhotoLoaded(data, x, y)});
};
