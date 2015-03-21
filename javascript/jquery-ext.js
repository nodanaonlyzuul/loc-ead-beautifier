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
