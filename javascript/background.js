(function($) {
    $.fn.changeElementType = function(newType) {
        this.each(function() {
            var attrs = {};

            $.each(this.attributes, function(idx, attr) {
               attrs[attr.nodeName] = attr.nodeValue;
            });

            $(this).replaceWith(function() {
                return $("<" + newType + "/>", attrs).append($(this).contents());
            });
	});
    };
})(jQuery);

var mayContainHeader = $("h3:contains('May contain:')").first();
var mayOccurWithinHeader = $("h3:contains('May occur within:')").first();
var exampleHeader = $("h3:contains('Example:'), h3:contains('Examples:')").first();


// Remove noise
$('h2:contains(EAD Elements)').remove();
$('h3:contains(Description:)').remove();
$('h1').remove();
$('h2').changeElementType("h1");


// Restyle
$('h3').css("background", "none").css("font-size", "1.26em").css("color", "#333");

if (mayContainHeader.length > 0) {
  var mayContainParagraph = mayContainHeader.next('p');
  var childTerms = mayContainParagraph.text().split(',');

  var linksToTerm = [];
  $.each(childTerms, function(index, childTerm){
    linksToTerm.push("<a href='http://loc.gov/ead/tglib/elements/"+$.trim(childTerm)+".html'>"+ childTerm +"</a> ");
  });

  mayContainParagraph.html("").append(linksToTerm)
}


if (mayOccurWithinHeader.length > 0) {
  var mayOccurWithinParagraph = mayOccurWithinHeader.next('p');
  var childTerms = mayOccurWithinParagraph.text().split(',');

  var linksToTerm = [];
  $.each(childTerms, function(index, childTerm){
    linksToTerm.push("<a href='http://loc.gov/ead/tglib/elements/"+$.trim(childTerm)+".html'>"+ childTerm +"</a> ");
  });

  mayOccurWithinParagraph.html("").append(linksToTerm);
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