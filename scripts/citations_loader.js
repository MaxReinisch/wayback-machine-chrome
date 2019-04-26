$(document).ready(function() {
  chrome.storage.sync.get(['citations'], function (event) {
    if(event.citations){
      v2();
    }
  })
});
