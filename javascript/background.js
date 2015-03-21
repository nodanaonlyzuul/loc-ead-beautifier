var mayContainHeader      = $("h3:contains('May contain:')").first();
var mayOccurWithinHeader  = $("h3:contains('May occur within:')").first();
var exampleHeader         = $("h3:contains('Example:'), h3:contains('Examples:')").first();
var attributesTable       = $("h3:contains('Attributes:')").siblings('table');
var nonLinkables          = ["#PCDATA", "EMPTY"];

// Remove noise
$('h2:contains(EAD Elements)').remove();
$('h3:contains(Description:)').remove();
$('h1').remove();
$('h2').changeElementType("h1");

// Restyle
$('h3').css("background", "none").css("font-size", "1.25em").css("color", "#333");


// TODO: These are two blocks are exactly the same.
if (mayContainHeader.length > 0) {
  var mayContainParagraph = mayContainHeader.next('p');
  var childTerms = mayContainParagraph.text().split(',');

  var linksToTerm = [];
  $.each(childTerms, function(index, childTerm) {
    if (nonLinkables.indexOf(childTerm) == -1 ) {
      linksToTerm.push("<a href='http://loc.gov/ead/tglib/elements/"+$.trim(childTerm)+".html'>"+childTerm+"</a>");
    }  else {
      linksToTerm.push(childTerm)
    }
  });

  mayContainParagraph.html("").append(linksToTerm.join(" "));
}


if (mayOccurWithinHeader.length > 0) {
  var mayOccurWithinParagraph = mayOccurWithinHeader.next('p');
  var childTerms = mayOccurWithinParagraph.text().split(',');

  var linksToTerm = [];
  $.each(childTerms, function(index, childTerm){
    if (nonLinkables.indexOf(childTerm) == -1 ) {
      linksToTerm.push("<a href='http://loc.gov/ead/tglib/elements/"+$.trim(childTerm)+".html'>"+ childTerm +"</a>");
    } else {
      linksToTerm.push(childTerm)
    }
  });

  mayOccurWithinParagraph.html("").append(linksToTerm.join(" "));
}

if (exampleHeader.length > 0) {
  var usageBlock = exampleHeader.siblings("pre");
  if (usageBlock.length > 0) {
    var exampleText = usageBlock.html();
    usageBlock.html("");
    usageBlock.append("<code>");

    var codeElement = usageBlock.children("code");
    codeElement.addClass("xml").css("font-size", "1.5em");
    codeElement.html(exampleText);
    hljs.highlightBlock(codeElement[0]);
  }
}

if (attributesTable.length > 0) {
  attributesTable.attr("width", "98%").attr("border", "1")
}