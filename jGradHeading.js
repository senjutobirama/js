(function($) {
    $.fn.jGradHeading = function(options) {
        return this.each(function() {
            var settings = $.extend({
                topColor: '#1abc9c',
                botColor: '#9198e5'
            }, options);

            var headings = $(this).children(":header")
            var numOfHeadings = headings.length;

            topRgb = hexToRgb(settings.topColor);
            botRgb = hexToRgb(settings.botColor);

            diffR = botRgb.r - topRgb.r;
            diffG = botRgb.g - topRgb.g;
            diffB = botRgb.b - topRgb.b;

            if (numOfHeadings === 1) {
                $(this).children(":header").eq(0).css('color', settings.topColor);
            } else if (numOfHeadings === 2) {
                $(this).children(":header").eq(0).css('color', settings.topColor);
                $(this).children(":header").eq(1).css('color', settings.topColor);
            } else {
                $(this).children(":header").eq(0).css('color', settings.topColor);

                for (var i = 1; i < numOfHeadings - 1; i++) {
                    $(this).children(":header").eq(i).css('color', rgbToHex(Math.round(topRgb.r + (diffR / (numOfHeadings - 1)) * i), Math.round(topRgb.g + (diffG / (numOfHeadings - 1)) * i), Math.round(topRgb.b + (diffB / (numOfHeadings - 1)) * i)));
                }

                $(this).children(":header").eq(numOfHeadings - 1).css('color', settings.botColor);
            }
        });
    }
}(jQuery));


function partToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + partToHex(r) + partToHex(g) + partToHex(b);
}

function hexToRgb(hex) {
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return rgb ? {
    r: parseInt(rgb[1], 16),
    g: parseInt(rgb[2], 16),
    b: parseInt(rgb[3], 16)
  } : null;
}
