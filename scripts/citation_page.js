$(document).ready(function() {
  let url = getUrlByParameter('url')
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'html'
  })
  .done(function(res) {
    let span = document.createElement('span');
    span.innerHTML = res;
    let body = (span.textContent || span.innerText);
    let candidates = v2(body);
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
                  href: getUrlFromIdentifier(identifier, citation),
                  target: '_blank'
                }).text(candidates[i])
              )
            )
          }
        })
      }
    }
  })
  .fail(function() {
    console.log("error");
  })
});
