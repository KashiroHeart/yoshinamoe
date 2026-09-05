$(function(){
  // presets
  var presets = {
    /*
    "2": ["0", "1"],
    "8": ["0", "1", "2", "3", "4", "5", "6", "7"],
    */
    "10": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "16": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
    "36": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "b32": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "2", "3", "4", "5", "6", "7"],
    "b64": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-"],
    "z85": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ".", "-", ":", "+", "=", "^", "!", "/", "*", "?", "&", "<", ">", "(", ")", "[", "]", "{", "}", "@", "%", "$", "#"],
    "abc": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "abclarge": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    "50on": ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'],
    "iroha": ['い', 'ろ', 'は', 'に', 'ほ', 'へ', 'と', 'ち', 'り', 'ぬ', 'る', 'を', 'わ', 'か', 'よ', 'た', 'れ', 'そ', 'つ', 'ね', 'な', 'ら', 'む', 'う', 'ゐ', 'の', 'お', 'く', 'や', 'ま', 'け', 'ふ', 'こ', 'え', 'て', 'あ', 'さ', 'き', 'ゆ', 'め', 'み', 'し', 'ゑ', 'ひ', 'も', 'せ', 'す', 'ん'],
    "y252": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ".", "-", ":", "+", "=", "^", "!", "/", "*", "?", "&", "<", ">", "(", ")", "[", "]", "{", "}", "@", "%", "$", "#", "ぁ", "あ", "ぃ", "い", "ぅ", "う", "ぇ", "え", "ぉ", "お", "か", "が", "き", "ぎ", "く", "ぐ", "け", "げ", "こ", "ご", "さ", "ざ", "し", "じ", "す", "ず", "せ", "ぜ", "そ", "ぞ", "た", "だ", "ち", "ぢ", "っ", "つ", "づ", "て", "で", "と", "ど", "な", "に", "ぬ", "ね", "の", "は", "ば", "ぱ", "ひ", "び", "ぴ", "ふ", "ぶ", "ぷ", "へ", "べ", "ぺ", "ほ", "ぼ", "ぽ", "ま", "み", "む", "め", "も", "ゃ", "や", "ゅ", "ゆ", "ょ", "よ", "ら", "り", "る", "れ", "ろ", "ゎ", "わ", "ゐ", "ゑ", "を", "ん", "ァ", "ア", "ィ", "イ", "ゥ", "ウ", "ェ", "エ", "ォ", "オ", "カ", "ガ", "キ", "ギ", "ク", "グ", "ケ", "ゲ", "コ", "ゴ", "サ", "ザ", "シ", "ジ", "ス", "ズ", "セ", "ゼ", "ソ", "ゾ", "タ", "ダ", "チ", "ヂ", "ッ", "ツ", "ヅ", "テ", "デ", "ト", "ド", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "バ", "パ", "ヒ", "ビ", "ピ", "フ", "ブ", "プ", "ヘ", "ベ", "ペ", "ホ", "ボ", "ポ", "マ", "ミ", "ム", "メ", "モ", "ャ", "ヤ", "ュ", "ユ", "ョ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ヮ", "ワ", "ヰ", "ヱ", "ヲ", "ン", "ヴ"],
  };
  var presetName = {
    "10": "10進数/10digit",
    "16": "16進数/16digit",
    "36": "36進数/36digit",
    "b32": "Base32",
    "b64": "Base64",
    "z85": "Z85",
    "abc": "a-z",
    "abclarge": "A-Z",
    "50on": "五十音",
    "iroha": "いろは",
    "y252": "Y252(独自配列)",
  }
  
  var MODE = true;
  var MODE2 = true;
  
  var AUTO = true;
  var IGNORE = true;
  
  // define functions
  var error = function(err){
    $("#error").text(err);
    if(err) $("#output").val("ERR");
  }
  var warn = function(err){
    $("#warn").text(err);
    return true;
  }
  
  var dectoany = function(decimal, to, callback){
    var rule = $("#array").val().split(""),
        rule2 = $("#array2").val().split("");

    var len = 0;
    var flag = true;

    while(flag){
      if( decimal < BigInt(to) ** BigInt(len) ){
        flag = false;
      }else{
        len++;
      }
    }
    
    // console.warn(`LEN ${len}`);

    var segments = [];
    var max = MODE2 ? rule.length+1 : Math.max(rule.length, rule2.length)+1;
    for ( var i=0;i<len;i++ ){
      for ( var j=0;j<max;j++ ){
        var cur = decimal-BigInt(j)*(BigInt(to)**BigInt(len-1-i))
        
        // console.warn(`A ${i}: ${decimal} - ${j} * (${to} ** ${len-1-i}) = ${cur}`);

        if( cur<0 ){
          var cur2 = BigInt(j-1)*(BigInt(to)**BigInt(len-1-i));
          
          // console.warn(`B ${i}: ${decimal} - ${cur2} = ${decimal-cur2}`);
          // console.warn(`B ${i}: OUTPUT ${j-i} ( ${rule[j-1]} )`);
          
          segments.push( j-1 );
          decimal -= cur2;

          break;
        }
      }
    }
    
    var rezRule = MODE2 ? rule : $("#array2").val().split("");
    
    var rez = segments.map(s => rezRule[s]).join("");
    // console.error(`C ${decimal} (${to}): ${rez}`);

    if( callback ) return callback( rez );
    return rez;
  }
  
  var convert = function() {
    var rule = $("#array").val().split("");
    
    var FROM = parseInt( $("#input_base").val() );
    var TO = parseInt( $("#output_base").val() );
    
    var INPUT = $("#input").val(),
        inp = INPUT.split("").reverse();
    
    var warned = false;
    // 不正を弾く処理
    if( MODE2 && rule.length < Math.max(FROM, TO) ){
      error("指定された基数が数列を超過しています。");
      return;
    }
    if( !MODE2 && (rule.length<FROM || $("#array2").val().length<TO) ){
      error("指定された基数が数列を超過しています。");
      return;
    }
    if( inp.find(f => rule.indexOf(f)==-1) ){
      if( IGNORE ){
        warned = warn("存在しない文字または改行があるため、省いて変換しています。");
        inp = inp.filter(f => rule.indexOf(f)!=-1);
      }else{
        error("数列に存在しない文字が含まれています。");
        return;
      }
    }
    if( !MODE2 && TO > $("#array2").val().length ){
      error("変換後数列の文字数が不足しています。");
      return;
    }
    if (!warned) warn("");
    error("");
    
    var decimal = 0n;
    
    // any -> 10
    for ( var i in inp ){
      decimal += BigInt( rule.indexOf(inp[i]) ) * ( BigInt(FROM)**BigInt(i) )
    }
    
    // 10 -> any
    if( MODE ){
      var rez = dectoany(decimal, TO);
     
      $("#output").val(rez);
    }else{
      var table = $("#pattern2_output");
      
      table.html("<tr><th>基数</th><th>値</th></tr>");
      
      for( var i=1;i<TO;i++ ){
        dectoany(decimal, i+1, function(res){
          var tr = $("<tr></tr>");
          var th = $("<th></th>");
          var td = $("<td></td>");
          th.text(i+1);
          td.text(res);

          tr.append(th).append(td).appendTo(table);
        });
      }
    }
  }
  
  // setup
  $("#convert").on("click", function(){
    convert();
  });
  $("#input").on("change, keyup", function() {
    if ( AUTO ) convert();
  });
  $("#input_base, #output_base").on("change", function() {
    if ( AUTO ) convert();
  });
  
  $("#preset_replace").on("click", function(){
    var presetID = $("#preset").val();
    
    var cur = presets[presetID];
    
    if( cur ){
      $("#array").val(cur.join(""));
    }
  });
  $("#preset_replace2").on("click", function(){
    var presetID = $("#preset").val();
    
    var cur = presets[presetID];
    
    if( cur ){
      $("#array2").val(cur.join(""));
    }
  });
  $("#array_reverse").on("click", function(){
    if ( !MODE2 ){
      var rule = $("#array").val();
      var rule2 = $("#array2").val();

      var FROM = $("#input_base").val();
      var TO = $("#output_base").val();

      var OUTPUT = $("#output").val();
      
      $("#array").val(rule2)
      $("#array2").val(rule)
      
      $("#input_base").val(TO);
      $("#output_base").val(FROM);
      
      $("#input").val(OUTPUT);
      
      convert();
    }
  });
  
  $("#mode").on("click", function(){
    MODE = !MODE;
    $("#pattern1, #pattern2").css("display", "none");
    if( MODE ){
      $("#pattern1").css("display", "block");
      $("#mode_sign").text("一方変換モード");
      $("#mode_sign").attr("class", "mode_simple");
    }else{
      $("#pattern2").css("display", "block");
      $("#mode_sign").text("多方変換モード");
      $("#mode_sign").attr("class", "mode_multiple");
    }
    if ( AUTO ) convert();
  });
  $("#mode2").on("click", function(){
    MODE2 = !MODE2;
    if( MODE2 ){
      $("#mode2_sign").text("同数列内で変換");
      $("#mode2_sign").attr("class", "mode_simple");
      $(".mode2_array2").css("display", "none");
      $("#preset_replace2").prop("disabled", true);
    }else{
      $("#mode2_sign").attr("class", "mode_multiple");
      $("#mode2_sign").text("変換後に別の数列で置換");
      $(".mode2_array2").css("display", "inline-block");
      $("#preset_replace2").prop("disabled", false);
    }
  });
  $("#auto").on("click", function(){
    AUTO = !AUTO;
    if( AUTO ){
      $("#auto_sign").text("有効");
      $("#auto_sign").attr("class", "enabled");
      $("#convert").prop("disabled", true);
    }else{
      $("#auto_sign").text("無効");
      $("#auto_sign").attr("class", "disabled");
      $("#convert").prop("disabled", false);
    }
    if ( AUTO ) convert();
  });
  $("#ignore").on("click", function(){
    IGNORE = !IGNORE;
    if( IGNORE ){
      $("#ignore_sign").text("有効");
      $("#ignore_sign").attr("class", "enabled");
    }else{
      $("#ignore_sign").text("無効");
      $("#ignore_sign").attr("class", "disabled");
    }
    convert();
  });
  
  for( let i in presets ){
    var opt = $("<option></option>");
    
    opt.val(i);
    opt.text(presetName[i]);
    $("#preset").append(opt);
  }
});