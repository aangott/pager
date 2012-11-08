function findPageNum() {
  var query = location.search.substring(1); // grab the get request minus the initial ?
  var pairs = query.split("&");             // break into name=value pairs
  for (var i = 0; i < pairs.length; i++) {
    var pos = pairs[i].indexOf('=');
    if (pos == -1) continue;
    var name = pairs[i].substring(0, pos);
    var value = pairs[i].substring(pos+1);
    if (name == 'page') return value;
  }
  return null;
}


function newUrl(currPg, direction) {
  var searchString = window.location.search;
  //determine where in the url the search string begins
  var currUrl = window.location.href;
  var searchStarts  = currUrl.indexOf(searchString);
  var searchFor = 'page=' + currPg;
  if (direction == 'next') {
    var replaceWith = 'page=' + (parseInt(currPg) + 1);
  }
  else if (direction == 'prev') {
    var replaceWith = 'page=' + (parseInt(currPg) - 1);
  }
  var newSearchString = searchString.replace(searchFor, replaceWith);
  var newUrl = currUrl.substring(0, searchStarts) + newSearchString;
  return newUrl;
}

/**************************main*******************************/

currPg = findPageNum();
if (currPg) {
  // this site is page-able, so turn on the icon.  need to send a message 
  // to background.js to do this.  args are required for this function, 
  // but no particular message needs sending here.
  chrome.extension.sendMessage('', ''); 
  // set the listener for keypresses
  document.onkeyup = function (e) {
    if (e.keyIdentifier == 'Right') {
      document.location = newUrl(currPg, 'next');
    }
    else if (e.keyIdentifier == 'Left' && currPg > 1) {
      document.location = newUrl(currPg, 'prev');
    }
  }  
}






