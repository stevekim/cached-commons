(function(b){var a=1;b.fn.dropShadow=function(c){var d=b.extend({left:4,top:4,blur:2,opacity:0.5,color:"black",swap:false},c);var e=b([]);this.not(".dropShadow").each(function(){var p=b(this);var l=[];var g=(d.blur<=0)?0:d.blur;var o=(g==0)?d.opacity:d.opacity/(g*8);var q=(d.swap)?a:a+1;var f=(d.swap)?a+1:a;var r;if(this.id){r=this.id+"_dropShadow"}else{r="ds"+(1+Math.floor(9999*Math.random()))}b.data(this,"shadowId",r);b.data(this,"shadowOptions",c);p.attr("shadowId",r).css("zIndex",q);if(p.css("position")!="absolute"){p.css({position:"relative",zoom:1})}bgColor=p.css("backgroundColor");if(bgColor=="rgba(0, 0, 0, 0)"){bgColor="transparent"}if(bgColor!="transparent"||p.css("backgroundImage")!="none"||this.nodeName=="SELECT"||this.nodeName=="INPUT"||this.nodeName=="TEXTAREA"){l[0]=b("<div></div>").css("background",d.color)}else{l[0]=p.clone().removeAttr("id").removeAttr("name").removeAttr("shadowId").css("color",d.color)}l[0].addClass("dropShadow").css({height:p.outerHeight(),left:g,opacity:o,position:"absolute",top:g,width:p.outerWidth(),zIndex:f});var n=(8*g)+1;for(m=1;m<n;m++){l[m]=l[0].clone()}var m=1;var k=g;while(k>0){l[m].css({left:k*2,top:0});l[m+1].css({left:k*4,top:k*2});l[m+2].css({left:k*2,top:k*4});l[m+3].css({left:0,top:k*2});l[m+4].css({left:k*3,top:k});l[m+5].css({left:k*3,top:k*3});l[m+6].css({left:k,top:k*3});l[m+7].css({left:k,top:k});m+=8;k--}var h=b("<div></div>").attr("id",r).addClass("dropShadow").css({left:p.position().left+d.left-g,marginTop:p.css("marginTop"),marginRight:p.css("marginRight"),marginBottom:p.css("marginBottom"),marginLeft:p.css("marginLeft"),position:"absolute",top:p.position().top+d.top-g,zIndex:f});for(m=0;m<n;m++){h.append(l[m])}p.after(h);e=e.add(h);b(window).resize(function(){try{h.css({left:p.position().left+d.left-g,top:p.position().top+d.top-g})}catch(i){}});a+=2});return this.pushStack(e)};b.fn.redrawShadow=function(){this.removeShadow();return this.each(function(){var c=b.data(this,"shadowOptions");b(this).dropShadow(c)})};b.fn.removeShadow=function(){return this.each(function(){var c=b(this).shadowId();b("div#"+c).remove()})};b.fn.shadowId=function(){return b.data(this[0],"shadowId")};b(function(){var c="<style type='text/css' media='print'>";c+=".dropShadow{visibility:hidden;}</style>";b("head").append(c)})})(jQuery);
