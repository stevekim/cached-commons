/*
 * Overscroll v1.3.0
 *  A jQuery Plugin for emulating the iPhone scrolling experience in a browser.
 *  http://azoffdesign.com/overscroll
 *
 * Intended for use with the latest jQuery
 *  http://code.jquery.com/jquery-latest.min.js
 *
 * Copyright 2010, Jonathan Azoff
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *  http://jquery.org/license
 *
 * Date: Wednesday, March 31st 2010
 */
"use strict";(function(a,b){b=a.fn.overscroll=function(c){return this.each(function(){b.init(a(this),c)})};a.extend(b,{events:{wheel:"mousewheel DOMMouseScroll",start:"select mousedown touchstart",drag:"mousemove touchmove",end:"mouseup mouseleave touchend",scroll:"scroll",ignored:"dragstart drag"},div:"<div/>",constants:{scrollDuration:800,captureThreshold:4,wheelDeltaMod:-18,scrollDeltaMod:5.7,thumbThickness:8,thumbOpacity:0.7,boundingBox:1000000},init:function(e,c,d){d={sizing:b.getSizing(e)};c=a.extend({openedCursor:"http://github.com/downloads/azoff/Overscroll/opened.cur",closedCursor:"http://github.com/downloads/azoff/Overscroll/closed.cur",showThumbs:true},(c||{}));c.cache={openedCursor:new Image(),closedCursor:new Image()};c.cache.openedCursor.src=c.openedCursor;c.cache.closedCursor.src=c.closedCursor;e.css({cursor:"url("+c.openedCursor+"), default",overflow:"hidden"}).bind(b.events.wheel,d,b.wheel).bind(b.events.start,d,b.start).bind(b.events.end,d,b.stop).bind(b.events.ignored,function(){return false});if(c.showThumbs){d.thumbs={visible:false};if(d.sizing.container.scrollWidth>0){d.thumbs.horizontal=a(b.div).css(b.getThumbCss(d.sizing.thumbs.horizontal)).fadeTo(0,0);e.prepend(d.thumbs.horizontal)}if(d.sizing.container.scrollHeight>0){d.thumbs.vertical=a(b.div).css(b.getThumbCss(d.sizing.thumbs.vertical)).fadeTo(0,0);e.prepend(d.thumbs.vertical)}d.sizing.relative=d.thumbs.vertical||d.thumbs.horizontal;if(d.sizing.relative){d.sizing.relative.oldOffset=d.sizing.relative.offset();e.scrollTop(b.constants.boundingBox).scrollLeft(b.constants.boundingBox);d.sizing.relative.remove().prependTo(e);d.sizing.relative.newOffset=d.sizing.relative.offset();d.sizing.relative=d.sizing.relative.oldOffset.left!=d.sizing.relative.newOffset.left||d.sizing.relative.oldOffset.top!=d.sizing.relative.newOffset.top;e.scrollTop(0).scrollLeft(0);e.bind(b.events.scroll,d,b.scroll)}}d.target=e;d.options=c},wheel:function(c,d){if(c.wheelDelta){d=c.wheelDelta/12000}if(c.detail){d=-c.detail/3}c.data.thumbs.vertical.stop(true,true).fadeTo(0,b.constants.thumbOpacity);c.data.target.scrollTop(c.data.target.scrollTop()-(d*b.constants.wheelDeltaMod));c.data.thumbs.vertical.stop(true,true).fadeTo("fast",0);return false},start:function(c){c.data.target.css("cursor","url("+c.data.options.closedCursor+"), default").bind(b.events.drag,c.data,b.drag).stop(true,true);c.data.position={x:c.pageX,y:c.pageY};c.data.capture={};c.data.isDragging=false;return false},drag:function(c){this.scrollLeft-=(c.pageX-c.data.position.x);this.scrollTop-=(c.pageY-c.data.position.y);c.data.position.x=c.pageX;c.data.position.y=c.pageY;if(typeof c.data.capture.index==="undefined"||--c.data.capture.index===0){c.data.isDragging=true;c.data.capture={x:c.pageX,y:c.pageY,index:b.constants.captureThreshold};if(c.data.thumbs&&!c.data.thumbs.visible){c.data.thumbs.visible=true;if(c.data.thumbs.vertical){c.data.thumbs.vertical.stop(true,true).fadeTo("fast",b.constants.thumbOpacity)}if(c.data.thumbs.horizontal){c.data.thumbs.horizontal.stop(true,true).fadeTo("fast",b.constants.thumbOpacity)}}}return true},scroll:function(d,g,c,f,e){f=d.data.target.scrollLeft();e=d.data.target.scrollTop();if(d.data.thumbs.horizontal){g=f*d.data.sizing.container.width/d.data.sizing.container.scrollWidth;c=d.data.sizing.thumbs.horizontal.top;if(d.data.sizing.relative){g+=f;c+=e}d.data.thumbs.horizontal.css("margin",c+"px 0 0 "+g+"px")}if(d.data.thumbs.vertical){g=d.data.sizing.thumbs.vertical.left;c=e*d.data.sizing.container.height/d.data.sizing.container.scrollHeight;if(d.data.sizing.relative){g+=f;c+=e}d.data.thumbs.vertical.css("margin",c+"px 0 0 "+g+"px")}},stop:function(e,d,c){if(typeof e.data.position!=="undefined"){e.data.target.css("cursor","url("+e.data.options.openedCursor+"), default").unbind(b.events.drag,b.drag);if(e.data.isDragging){d=b.constants.scrollDeltaMod*(e.pageX-e.data.capture.x);c=b.constants.scrollDeltaMod*(e.pageY-e.data.capture.y);e.data.target.stop(true,true).animate({scrollLeft:this.scrollLeft-d,scrollTop:this.scrollTop-c},{queue:false,duration:b.constants.scrollDuration,easing:"cubicEaseOut",complete:function(){if(e.data.thumbs&&e.data.thumbs.visible){e.data.thumbs.visible=false;if(e.data.thumbs.vertical){e.data.thumbs.vertical.stop(true,true).fadeTo("fast",0)}if(e.data.thumbs.horizontal){e.data.thumbs.horizontal.stop(true,true).fadeTo("fast",0)}}}})}e.data.capture=e.data.position=undefined}return !e.data.isDragging},getSizing:function(d,c){c={};c.container={width:d.width(),height:d.height()};d.scrollLeft(b.constants.boundingBox).scrollTop(b.constants.boundingBox);c.container.scrollWidth=d.scrollLeft();c.container.scrollHeight=d.scrollTop();d.scrollTop(0).scrollLeft(0);c.thumbs={horizontal:{width:c.container.width*c.container.width/c.container.scrollWidth,height:b.constants.thumbThickness,corner:b.constants.thumbThickness/2,left:0,top:c.container.height-b.constants.thumbThickness},vertical:{width:b.constants.thumbThickness,height:c.container.height*c.container.height/c.container.scrollHeight,corner:b.constants.thumbThickness/2,left:c.container.width-b.constants.thumbThickness,top:0}};c.container.width-=c.thumbs.horizontal.width;c.container.height-=c.thumbs.vertical.height;return c},getThumbCss:function(c){return{position:"absolute","background-color":"black",width:c.width+"px",height:c.height+"px",margin:c.top+"px 0 0 "+c.left+"px","-moz-border-radius":c.corner+"px","-webkit-border-radius":c.corner+"px","border-radius":c.corner+"px"}}});a.extend(a.easing,{cubicEaseOut:function(f,h,d,e){var g=d+e;return g*((f=f/1-1)*f*f+1)+d}})})(jQuery);