/* ダウンロードなど、どうぞお好きに */

$(function(){
  var presets = [
    {
      name: "a - z（半角）",
      text: "abcdefghijklmnopqrstuvwxyz",
    },
    {
      name: "ａ - ｚ（全角）",
      text: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ",
    },
    {
      name: "a - z（半角、J抜き）",
      text: "abcdefghiklmnopqrstuvwxyz",
    },
    {
      name: "いろは",
      text: "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせすん",
    },
    {
      name: "五十音（あ - ん）",
      text: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん",
    },
    {
      name: "五十音・濁音１（あ - ん＋が - ぽ）",
      text: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ",
    },
    {
      name: "五十音・濁音２（あ - ん　濁点追加）",
      text: "あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもやゆよらりるれろわをん",
    },
    {
      name: "Shift_JIS（ゐゑ抜き）",
      text: "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわをん",
    },
    {
      name:"2タッチ入力（横専用）",
      text: "あいうえおＡＢＣＤＥかきくけこＦＧＨＩＪさしすせそＫＬＭＮＯたちつてとＰＱＲＳＴなにぬねのＵＶＷＸＹはひふへほＺ！？／ーまみむめも￥＆＿＿＿や（ゆ）よ＊＃　＿＿らりるれろ１２３４５わをん゛゜６７８９０",
    },
  ];
  
  var num1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var num2 = ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９', 'ａ', 'ｂ', 'ｃ', 'ｄ', 'ｅ', 'ｆ', 'ｇ', 'ｈ', 'ｉ', 'ｊ', 'ｋ', 'ｌ', 'ｍ', 'ｎ', 'ｏ', 'ｐ', 'ｑ', 'ｒ', 'ｓ', 'ｔ', 'ｕ', 'ｖ', 'ｗ', 'ｘ', 'ｙ', 'ｚ'];
  
  var shift1 = ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ'],
      shift2 = ["ぱ","ぴ","ぷ","ぺ","ぽ"],
      shiftA = ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ", "っ"];
  
  var mode = true; // true = 生成、false = 解読
  
  var updateExample = function(){
    var listbase = $("#input1").val(),
        text =  $("#input2").val();
    var sortType = $("[name='sort']:checked").val();
    
    if( listbase.length>=1 ){
      var listMax = Math.ceil(Math.sqrt(listbase.length));
      var table = $("#listexample");
      
      table.children().remove();
      
      for( var x=0;x<listMax+1;x++ ){   // x座標作成
        var tr = $("<tr></tr>");
        for( var y=0;y<listMax+1;y++ ){ // y座標作成
          if( x==0 || y==0 ){
            var elem = $("<th></th>");
            
            elem.text(num2[x || y]);
            elem.appendTo(tr);
          }else{
            var elem = $("<td></td>");
            
            if( sortType=="0" ){       // 縦
              elem.text( listbase[(y-1)*listMax+(x-1)] );
            }else{ // 横
              elem.text( listbase[(x-1)*listMax+(y-1)] );
            }
            
            elem.appendTo(tr);
          }
        }
        tr.appendTo(table);
      }
    }else{
      $("#listexample").children().remove();
    }
  }
  
  var updateResult = function(){
    var listbase =  $("#input1").val(),
        text =  $("#input2").val();
    
    if( listbase.length && text.length ){
      if( $("#toggle_ij").prop('checked') ){
        text = text.replace(/j/g, "i").replace(/J/g, "I").replace(/ｊ/g, "ｉ").replace(/Ｊ/g, "Ｉ");
      }
      if( $("#toggle_case").prop('checked') ){
        listbase = listbase.toLowerCase();
        text = text.toLowerCase();
      }
      if( $("#toggle_0a").prop('checked') ){
        text = text.replace(/[0a]/g, "a");
      }
      
      var listMax = Math.ceil(Math.sqrt(listbase.length));
      var sortType = $("[name='sort']:checked").val();
      var dakuonFlag = $("#toggle_iroha_dakuon").prop('checked');

      var base = listbase.split("");
      var result = [];

      if( dakuonFlag && !base[48] ){
        base.push("゛");
      }
      
      if( mode ){
        var material = text.split("");
        
        if( dakuonFlag ){
          for( var i in material ){
            if( shift1.indexOf(material[i])!=-1 ){
              material[i] = String.fromCharCode( material[i].charCodeAt()-1 ) + "゛";
            }else if( shift2.indexOf(material[i])!=-1 ){
              material[i] = String.fromCharCode( material[i].charCodeAt()-2 ) + "゛";
            }
          }
          
          material = material.join("").split("");
        }
        
        for( var i in material ){
          var letter = base.findIndex(x => x==material[i]);

          if( !isNaN(letter) ){
            var x = (letter%listMax)+1,
                y = Math.ceil((letter+1)/listMax);

            if( sortType=="0" ){
              result.push(`${num1[x]}${num1[y]}`);
            }else{
              result.push(`${num1[y]}${num1[x]}`);
            }
          }else{
            result.push("00");
          }
        }
      }else{
        var pos = text.match(/.{2}|.{1}/g);
        
        if( pos ){
          for( var i in pos ){
            let letter = pos[i].split(""),
                x = num1.indexOf(letter[0]), y = num1.indexOf(letter[1]);
            
            if( !x || !y ) continue;

            if( sortType=="0" ){
              result.push( base[(y-1)*listMax+(x-1)] );
            }else{
              result.push( base[(x-1)*listMax+(y-1)] );
            }
          }
        }
      }
      
      result = result.join("");
      if( $("#toggle_0a").prop('checked') ){
        result = result.replace(/a/g, "0");
      }
      
      $("#result").val(result);
    }else{
      $("#result").val("");
    }
  }
  
  var update = function() {
    $("#length1").text( $("#input1").val().length );
    $("#length2").text( $("#input2").val().length );
    
    updateResult();
    updateExample();
  }
  
  var updateInput = function() {
    if( $("#toggle_dakuon").prop('checked') && mode ){
      var input1 = $("#input1").val();
      var input2 = $("#input2").val().split("");
      
      for( var i in input2 ){
        if( input1.indexOf(input2[i])!=-1 ) continue;
        if( shift1.indexOf(input2[i])!=-1 ){
          input2[i] = String.fromCharCode( input2[i].charCodeAt()-1 );
        }else if( shift2.indexOf(input2[i])!=-1 ){
          input2[i] = String.fromCharCode( input2[i].charCodeAt()-2 );
        }else if( shiftA.indexOf(input2[i])!=-1 ){
          input2[i] = String.fromCharCode( input2[i].charCodeAt()+1 );
        }
      }
      
      $("#input2").val( input2.join("") )
    }
    if( $("#toggle_wo").prop('checked') && mode ){
      var input2 = $("#input2").val();
      
      input2 = input2.replace(/を/g, "お");
      
      $("#input2").val( input2 );
    }
    if( $("#toggle_nomultiple").prop('checked') && mode ){
      var input1 = $("#input1").val().split("");
      var input2 = $("#input2").val().split("");
      
      input2 = input2.filter(x => input1.find(y => x==y));
      
      $("#input2").val( input2.join("") );
    }
    
    update();
  }
  
  // 設定
  $("#input1").on("keyup", function(){
    update();
  });
  $("#input2").on("keyup", function(){
    update();
  });
  $("#input1, #input2").on("change", function(){
    updateInput();
  });
  $("[name='sort']").on("change", function(){
    update();
  })
  $("#preset_import").on("click", function(){
    var index = $("#presets").val();
    var listbase = $("#input1");
    
    if( presets[index] ){
      listbase.val( presets[index].text );
      update();
    }
  });
  $("#mode").on("click", function(){
    mode = !mode;
    
    var keep1 = $("#input1").val(),
        keep2 = $("#input2").val();
    
    $("#mode").text(mode ? "暗号生成モード" : "暗号解読モード");
    $("#label2").text(mode ? "平　文" : "暗号文");
    
    $("#input2").val("");
    
     update();
  });
  $("#copy").on("click", function(){
    $("#result")[0].select();
    document.execCommand('copy');
    $("#copycheck").text("コピーしました。");
    $("#copycheck").css("color", "#" + (Math.floor(Math.random() * 16777215) + 1).toString(16));
  });
  
  for( var i in presets ){
    var elem = $("<option></option>");
    elem.val(i);
    elem.text(presets[i].name);
    
    $("#presets").append(elem);
  }
});