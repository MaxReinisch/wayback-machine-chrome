// Max Reinisch
// Demo feature for mark
// "I would like a way to show the [booklist] below to people who are on these [targets]"
const targets = [
  "https://en.wikipedia.org/wiki/Chernobyl_disaster",
  "https://en.wikipedia.org/wiki/Valery_Legasov"
];
const booklist = [
  "https://archive.org/metadata/midnightincherno0000higg",
  "https://archive.org/metadata/ChernobylTheHistoryOfANuclearCatastropheSerhiiPlokhy",
  "https://archive.org/metadata/chernobyl012340i00leat",
  "https://archive.org/metadata/voicesfromcherno0000alek",
  "https://archive.org/metadata/producingpowerpr0000schm",
  "https://archive.org/metadata/truthaboutcherno0000medv",
  "https://archive.org/metadata/theedgeofarmageddonlessonsfromthebrink",
  "https://archive.org/metadata/chernobylnotebookgrigoriymedvedev",
  "https://archive.org/metadata/mychernobylhuman0000boro",
  "https://archive.org/metadata/igorkostinchernobylconfessionsofaunreporter",
  "https://archive.org/metadata/ablazestoryofher0000read",
  "https://archive.org/metadata/chernobylrecordrfmould"
];

function getTargets(){
  return targets;
}
function getBookDetails(url){
  // Encapsulate the chrome message sender with a promise object
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({
      message: 'bookdetails',
      url: url
    }, function (books) {
      if (books) {
        resolve(books)
      } else {
        reject(new Error('error'))
      }
    })
  })
}
function listBooks(){

  for(let i = 0; i < booklist.length; i++){
    getBookDetails(booklist[i]).then(data=>{
    $(".loader").hide();
    $("#resultsTray").append(addBook(getMetadata(data)));
  }).catch( function(error) {
    $(".loader").hide();
    $("#resultsTray").css("grid-template-columns", "none").append(
      $("<div>").html(error)
    );
  });}
}
window.onload = function(){
  listBooks()
}
