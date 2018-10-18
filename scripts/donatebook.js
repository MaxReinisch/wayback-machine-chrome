let has_book = document.getElementById("has_book");

function getUrlByParameter(name){
    var url=window.location.href;
    var indexOfEnd=url.length;
    var index=url.indexOf(name);
    var length=name.length;
    return url.slice(index+length+1,indexOfEnd);
}

has_book.addEventListener("click", function(){
  let mailInfo = document.getElementById("mail_info");
  mailInfo.setAttribute("style", "display:block;")
});

function getOpenLibraryURL(isbn){
  return "https://openlibrary.org/isbn/"+isbn
}
function showBook(url){
  let div = document.getElementById("iframeContainer");
  let iframe = document.createElement("iframe");
  iframe.setAttribute("src", url);
  iframe.setAttribute("height", "500px");
  iframe.appendChild(document.createTextNode("bla bla bla"));
  div.appendChild(iframe);
}
function run(){
  let isbn = getUrlByParameter("isbn");
  let url = getOpenLibraryURL(isbn);
  showBook(url);
}

run();
