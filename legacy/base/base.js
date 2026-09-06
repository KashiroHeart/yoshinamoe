init(function(){
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

  // elements
  var byId = function(id){ return document.getElementById(id); };

  var inputEl = byId("input"),
      outputEl = byId("output"),
      arrayEl = byId("array"),
      array2El = byId("array2"),
      inputBaseEl = byId("input_base"),
      outputBaseEl = byId("output_base"),
      presetEl = byId("preset"),
      errorEl = byId("error"),
      warnEl = byId("warn"),
      modeSignEl = byId("mode_sign"),
      mode2SignEl = byId("mode2_sign"),
      autoSignEl = byId("auto_sign"),
      ignoreSignEl = byId("ignore_sign"),
      convertEl = byId("convert"),
      presetReplace2El = byId("preset_replace2"),
      pattern1El = byId("pattern1"),
      pattern2El = byId("pattern2"),
      pattern2OutputEl = byId("pattern2_output");

  var MODE = true;
  var MODE2 = true;

  var AUTO = true;
  var IGNORE = true;

  // define functions
  var error = function(err){
    errorEl.textContent = err;
    if(err) outputEl.value = "ERR";
  }
  var warn = function(err){
    warnEl.textContent = err;
    return true;
  }

  var dectoany = function(decimal, to, callback){
    var rule = arrayEl.value.split(""),
        rule2 = array2El.value.split("");

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

    var rezRule = MODE2 ? rule : array2El.value.split("");

    var rez = segments.map(s => rezRule[s]).join("");
    // console.error(`C ${decimal} (${to}): ${rez}`);

    if( callback ) return callback( rez );
    return rez;
  }

  var convert = function() {
    var rule = arrayEl.value.split("");

    var FROM = parseInt( inputBaseEl.value );
    var TO = parseInt( outputBaseEl.value );

    var INPUT = inputEl.value,
        inp = INPUT.split("").reverse();

    var warned = false;
    // 不正を弾く処理
    if( MODE2 && rule.length < Math.max(FROM, TO) ){
      error("指定された基数が数列を超過しています。");
      return;
    }
    if( !MODE2 && (rule.length<FROM || array2El.value.length<TO) ){
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
    if( !MODE2 && TO > array2El.value.length ){
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

      outputEl.value = rez;
    }else{
      pattern2OutputEl.innerHTML = "<tr><th>基数</th><th>値</th></tr>";

      for( let i=1;i<TO;i++ ){
        dectoany(decimal, i+1, function(res){
          var tr = document.createElement("tr");
          var th = document.createElement("th");
          var td = document.createElement("td");
          th.textContent = i+1;
          td.textContent = res;

          tr.appendChild(th);
          tr.appendChild(td);
          pattern2OutputEl.appendChild(tr);
        });
      }
    }
  }

  // setup
  convertEl.addEventListener("click", function(){
    convert();
  });
  inputEl.addEventListener("input", function() {
    if ( AUTO ) convert();
  });
  inputEl.addEventListener("change", function() {
    if ( AUTO ) convert();
  });
  [inputBaseEl, outputBaseEl].forEach(function(el){
    el.addEventListener("change", function() {
      if ( AUTO ) convert();
    });
  });

  byId("preset_replace").addEventListener("click", function(){
    var presetID = presetEl.value;

    var cur = presets[presetID];

    if( cur ){
      arrayEl.value = cur.join("");
    }
  });
  presetReplace2El.addEventListener("click", function(){
    var presetID = presetEl.value;

    var cur = presets[presetID];

    if( cur ){
      array2El.value = cur.join("");
    }
  });
  byId("array_reverse").addEventListener("click", function(){
    if ( !MODE2 ){
      var rule = arrayEl.value;
      var rule2 = array2El.value;

      var FROM = inputBaseEl.value;
      var TO = outputBaseEl.value;

      var OUTPUT = outputEl.value;

      arrayEl.value = rule2;
      array2El.value = rule;

      inputBaseEl.value = TO;
      outputBaseEl.value = FROM;

      inputEl.value = OUTPUT;

      convert();
    }
  });

  byId("mode").addEventListener("click", function(){
    MODE = !MODE;
    pattern1El.style.display = "none";
    pattern2El.style.display = "none";
    if( MODE ){
      pattern1El.style.display = "block";
      modeSignEl.textContent = "一方変換モード";
      modeSignEl.className = "mode_simple";
    }else{
      pattern2El.style.display = "block";
      modeSignEl.textContent = "多方変換モード";
      modeSignEl.className = "mode_multiple";
    }
    if ( AUTO ) convert();
  });
  byId("mode2").addEventListener("click", function(){
    MODE2 = !MODE2;
    if( MODE2 ){
      mode2SignEl.textContent = "同数列内で変換";
      mode2SignEl.className = "mode_simple";
      document.querySelectorAll(".mode2_array2").forEach(function(el){
        el.style.display = "none";
      });
      presetReplace2El.disabled = true;
    }else{
      mode2SignEl.className = "mode_multiple";
      mode2SignEl.textContent = "変換後に別の数列で置換";
      document.querySelectorAll(".mode2_array2").forEach(function(el){
        el.style.display = "inline-block";
      });
      presetReplace2El.disabled = false;
    }
  });
  byId("auto").addEventListener("click", function(){
    AUTO = !AUTO;
    if( AUTO ){
      autoSignEl.textContent = "有効";
      autoSignEl.className = "enabled";
      convertEl.disabled = true;
    }else{
      autoSignEl.textContent = "無効";
      autoSignEl.className = "disabled";
      convertEl.disabled = false;
    }
    if ( AUTO ) convert();
  });
  byId("ignore").addEventListener("click", function(){
    IGNORE = !IGNORE;
    if( IGNORE ){
      ignoreSignEl.textContent = "有効";
      ignoreSignEl.className = "enabled";
    }else{
      ignoreSignEl.textContent = "無効";
      ignoreSignEl.className = "disabled";
    }
    convert();
  });

  for( let i in presets ){
    var opt = document.createElement("option");

    opt.value = i;
    opt.textContent = presetName[i];
    presetEl.appendChild(opt);
  }
});
