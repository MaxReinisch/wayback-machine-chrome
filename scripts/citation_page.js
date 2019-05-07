$(document).ready(function() {
  chrome.runtime.sendMessage({
    message: 'get_sidecar'
  }, function(sidecar){
    console.log({
      url: getUrlByParameter('url'),
      sidecar: sidecar
    })
    for(let i = 0; i < sidecar.length; i++){
      if (sidecar[i]) {
        query = getAdvancedSearchQuery(sidecar[i])
        chrome.runtime.sendMessage({
          message: 'citationadvancedsearch',
          query: query
        }, function (identifier) {
          if (identifier) {
            $('#citation_tray').append(
              $('<li>').append(
                $('<a>').attr({
                  href: getUrlFromIdentifier(identifier),
                  target: '_blank'
                }).text(sidecar[i].citation)
              )
            )
          }else{
            $('#citation_tray').append(
              $('<li>').text(sidecar[i].citation)
            )
          }
        })
      }
    }
  })
});
