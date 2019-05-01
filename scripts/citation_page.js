$(document).ready(function() {
  chrome.runtime.sendMessage({
    message: 'get_candidates'
  }, function(candidates){
    console.log(candidates)
    for(let i = 0; i < candidates.length; i++){
      let citation = getCitation(candidates[i])
      if (citation) {
        query = getAdvancedSearchQuery(citation)
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
                }).text(candidates[i])
              )
            )
          }
        })
      }
    }
  })
});
