(function(a){a.picasa={albums:function(b,d){var c="http://picasaweb.google.com/data/feed/base/user/:user_id?alt=json&kind=album&hl=en_US&access=visible&fields=entry(id,media:group(media:content,media:description,media:keywords,media:title))&callback=?";c=c.replace(/:user_id/,b);a.getJSON(c,function(g){var e=null;var f=[];a.each(g.feed.entry,function(j,h){e={id:h.id["$t"].split("?")[0].split("albumid/")[1],title:h["media$group"]["media$title"]["$t"],description:h["media$group"]["media$description"]["$t"],thumb:h["media$group"]["media$content"][0]["url"],};e.images=function(i){a.picasa.images(b,e.id,i)};f.push(e)});d(f)})},images:function(d,c,g){var e="http://picasaweb.google.com/data/feed/base/user/:user_id/albumid/:album_id?alt=json&kind=photo&hl=en_US&fields=entry(title,gphoto:numphotos,media:group(media:content,media:thumbnail))&callback=?";e=e.replace(/:user_id/,d).replace(/:album_id/,c);var f=null;var b=[];a.getJSON(e,function(h){a.each(h.feed.entry,function(k,j){f=j["media$group"]["media$content"][0];f.title=j.title["$t"];f.thumbs=[];a.each(j["media$group"]["media$thumbnail"],function(i,l){f.thumbs.push(l)});b.push(f)});g(b)})}};a.fn.picasaAlbums=function(b,c){a.picasa.albums(b,function(d){if(c){c(d)}})};a.fn.picasaGallery=function(c,b,e){var d=a(this);a.picasa.images(c,b,function(f){if(e){e(f)}else{var g="<ul class='picasa-album'>\n";a.each(f,function(j,h){g+="  <li class='picasa-image'>\n";g+="    <a class='picasa-image-large' href='"+h.url+"'>\n";g+="      <img class='picasa-image-thumb' src='"+h.thumbs[1].url+"'/>\n";g+="    </a>\n";g+="  </li>\n"});g+="</ul>";d.append(g)}})}})(jQuery);