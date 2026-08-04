(function(){
  var list = {
    tools: "ツール置き場",
      cipher: "暗号系",
    
    gallery: "落書き置き場",
      fanfic: "二次創作",
      shaded: "限定公開",
    
    misc: "その他置き場",
      dairi: "代理",
      uchinoko: "創作",
  }
  
  var dir = location.href.slice(location.origin.length).split("/");
  dir[0] = "";
  var name = [];
  for ( var i=0;i<dir.length;i++ ){
    name.push(dir[i]);
    var title;
    if ( i==0 && !dir[i] ) {
      title = "TOP";
    }else if ( !dir[i] ) {
      continue;
    }else if ( dir.length-1==i ) {
      title = document.title;
    }else{
      title = list[dir[i]] || "---";
    };
    var dirname = (i==0 ? "/" : "") + name.join("/");
    if ( i!=0 ) document.write('<span class="separator">&gt;</span>');
  	document.write("<a href='"+ dirname + "'>" + title + "</a>");
  }
})();