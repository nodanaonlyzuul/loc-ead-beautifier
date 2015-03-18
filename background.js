var mayContainHeader = $("h3:contains('May contain:')").first();
var mayOccurWithinHeader = $("h3:contains('May occur within:')").first();

if (mayContainHeader.length > 0) {
  var mayContainParagraph = mayContainHeader.next('p');
  var childTerms = mayContainParagraph.text().split(',');

  var linksToTerm = [];
  $.each(childTerms, function(index, childTerm){
    linksToTerm.push("<code><a href='http://loc.gov/ead/tglib/elements/"+$.trim(childTerm)+".html'>"+ childTerm +"</a></code> ");
  });

  mayContainParagraph.html("").append(linksToTerm)
}


if (mayOccurWithinHeader.length > 0) {
  var mayOccurWithinParagraph = mayOccurWithinHeader.next('p');
  var childTerms = mayOccurWithinParagraph.text().split(',');

  var linksToTerm = [];
  $.each(childTerms, function(index, childTerm){
    linksToTerm.push("<code><a href='http://loc.gov/ead/tglib/elements/"+$.trim(childTerm)+".html'>"+ childTerm +"</a></code> ");
  });

  mayOccurWithinParagraph.html("").append(linksToTerm);
}
