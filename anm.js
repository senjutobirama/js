// Anm Â© 2014-2015 Andrey Polischuk github.com/andrepolischuk/anm
!function(){"use strict";function g(){}function i(a){var b={};return b.x=a.clientX-window.innerWidth/2||0,b.y=a.clientY-window.innerHeight/2||0,b.fi=Math.atan(0===b.x?1/0:-b.y/b.x)+(b.x<0?Math.PI:-b.y<0?2*Math.PI:0),b.s=45*Math.sin(2*b.fi)/100,b.x/=100,b.y/=100,b.r=2*(Math.sqrt(Math.pow(b.x,2)+Math.pow(b.y,2))/Math.sqrt(Math.pow(window.innerWidth,2)+Math.pow(window.innerHeight,2))),b}function j(a){for(var b={},c=0;c<e.length;c++)b[e[c]]=+a.getAttribute("data-speed-"+e[c])||0;return b}function k(a,b){var c={};return c.x=a.x*b.x+"px",c.y=a.y*b.y+"px",c.scale=1+a.r*b.scale,c.opacity=1-a.r*Math.abs(b.opacity),c.rotate=100*-a.s*a.r*b.rotate+"deg",c}function l(a,c){if(b)a.style.marginLeft=c.x,a.style.marginTop=c.y;else{for(var d in f)f.hasOwnProperty(d)&&(a.style[d]=[f[d],"(",c.x+","+c.y,"translate"===f[d]?"":",0",") scale(",c.scale,") rotate(",c.rotate,")"].join(""));a.style.opacity=c.opacity,a.style.MozOpacity=c.opacity}}function m(a){if(!d){a="touchmove"===a.type?a.changedTouches[0]:a;for(var b,c,g,e=i(a),f=0;f<h.length;f++)g=h[f],b=j(g),c=k(e,b),l(g,c)}}var a=document.body.getAttribute("data-anm");if(a){var d,b=/MSIE.\d+\./gi.test(navigator.userAgent)&&+navigator.userAgent.replace(/.*MSIE.(\d+)\..*/gi,"$1")<9,c="ontouchstart"in window||"onmsgesturechange"in window?"touchmove":"mousemove",e=["x","y","scale","opacity","rotate"],f={webkitTransform:"translate3d",MozTransform:"translate3d",msTransform:"translate3d",OTransform:"translate",transform:"translate3d"},h=g.elements=document.querySelectorAll(a);g.on=function(){d=!1},g.off=function(){d=!0},g.toggle=function(){d=!d},m({}),window.addEventListener?window.addEventListener(c,m,!1):window.attachEvent("onmousemove",function(){m.call(window,window.event)}),"function"==typeof define&&define.amd?define([],function(){return g}):"undefined"!=typeof module&&module.exports?module.exports=g:this.anm=g}}.call(this);