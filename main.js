$("#search").on("click", function(event) {
  event.preventDefault();
  var search = $("#keyword").val();
  var startyear = $("#startyear").val();
  var endyear = $("#endyear").val();
  console.log("click search");
  SearchNytime(search,startyear,endyear);
});
function SearchNytime( Article,startYear, endYear) {
  // to check the begin_date
  if (startYear === undefined || startYear === "") {
    startYear = "";
  } else {
    startYear = "&begin_date=" + startYear + "0120";
  }
  // to check end_date 
  if (endYear === undefined || endYear === "") {
    endYear = "";
  } else {
    endYear = "&end_date=" + endYear + "0120";
  }
  var apiKey = "IdORRr5cQ79Gtfs0XavqoU22Q9e5kWow"; // This  is API Key Search for New York Times articles from https://developer.nytimes.com/ 
  //here I build URL to extract information from APi
  var nytimesURL =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    apiKey +
    "&q=" + 
    Article+
    startYear +
    endYear;
  console.log(nytimesURL);// print URL
  $.ajax({
    url: nytimesURL,
    method: "GET"
  }).then(function(response) {
    var results = response.response.docs;
    console.log(response); 

    // to select number records
    var num = $("#selectnumber").val();
    for (var i = 0; i < num; i++) {
    var url = results[i].web_url;              //Filter Query Examples from https://developer.nytimes.com/
    var titile = results[i].snippet;           //Filter Query Examples from https://developer.nytimes.com/
    var details = results[i].lead_paragraph;   //Filter Query Examples from https://developer.nytimes.com/
    var keywordsource=results[i].source;       //Filter Query Examples from https://developer.nytimes.com/
     var section= results[i].section_name;     //Filter Query Examples from https://developer.nytimes.com/
    // add to the table 
      $('#tbl_Notes_list').append(`<tr> <td>${titile} </td> `+
      `<td> ${details}</td> `+
      `<td> ${keywordsource}</td> `+
      `<td> ${section}</td> `+
      `</tr>`);
    }
  });
}

