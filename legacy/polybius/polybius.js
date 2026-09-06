/* ダウンロードなど、どうぞお好きに */

init(function(){
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

  // elements
  var byId = function(id){ return document.getElementById(id); };

  var input1El = byId("input1"),
      input2El = byId("input2"),
      resultEl = byId("result"),
      length1El = byId("length1"),
      length2El = byId("length2"),
      presetsEl = byId("presets"),
      listexampleEl = byId("listexample"),
      modeEl = byId("mode"),
      label2El = byId("label2"),
      copycheckEl = byId("copycheck");

  var sortType = function(){
    return document.querySelector("[name='sort']:checked").value;
  };

  var updateExample = function(){
    var listbase = input1El.value;
    var sort = sortType();

    listexampleEl.replaceChildren();

    if( listbase.length>=1 ){
      var listMax = Math.ceil(Math.sqrt(listbase.length));

      for( var x=0;x<listMax+1;x++ ){   // x座標作成
        var tr = document.createElement("tr");
        for( var y=0;y<listMax+1;y++ ){ // y座標作成
          if( x==0 || y==0 ){
            var elem = document.createElement("th");

            elem.textContent = num2[x || y];
            tr.appendChild(elem);
          }else{
            var elem = document.createElement("td");

            if( sort=="0" ){       // 縦
              elem.textContent = listbase[(y-1)*listMax+(x-1)];
            }else{ // 横
              elem.textContent = listbase[(x-1)*listMax+(y-1)];
            }

            tr.appendChild(elem);
          }
        }
        listexampleEl.appendChild(tr);
      }
    }
  }

  var updateResult = function(){
    var listbase = input1El.value,
        text = input2El.value;

    if( listbase.length && text.length ){
      if( byId("toggle_ij").checked ){
        text = text.replace(/j/g, "i").replace(/J/g, "I").replace(/ｊ/g, "ｉ").replace(/Ｊ/g, "Ｉ");
      }
      if( byId("toggle_case").checked ){
        listbase = listbase.toLowerCase();
        text = text.toLowerCase();
      }
      if( byId("toggle_0a").checked ){
        text = text.replace(/[0a]/g, "a");
      }

      var listMax = Math.ceil(Math.sqrt(listbase.length));
      var sort = sortType();
      var dakuonFlag = byId("toggle_iroha_dakuon").checked;

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

            if( sort=="0" ){
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

            if( sort=="0" ){
              result.push( base[(y-1)*listMax+(x-1)] );
            }else{
              result.push( base[(x-1)*listMax+(y-1)] );
            }
          }
        }
      }

      result = result.join("");
      if( byId("toggle_0a").checked ){
        result = result.replace(/a/g, "0");
      }

      resultEl.value = result;
    }else{
      resultEl.value = "";
    }
  }

  var update = function() {
    length1El.textContent = input1El.value.length;
    length2El.textContent = input2El.value.length;

    updateResult();
    updateExample();
  }

  var updateInput = function() {
    if( byId("toggle_dakuon").checked && mode ){
      var input1 = input1El.value;
      var input2 = input2El.value.split("");

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

      input2El.value = input2.join("");
    }
    if( byId("toggle_wo").checked && mode ){
      var input2 = input2El.value;

      input2 = input2.replace(/を/g, "お");

      input2El.value = input2;
    }
    if( byId("toggle_nomultiple").checked && mode ){
      var input1 = input1El.value.split("");
      var input2 = input2El.value.split("");

      input2 = input2.filter(x => input1.find(y => x==y));

      input2El.value = input2.join("");
    }

    update();
  };

  // 設定
  [input1El, input2El].forEach(function(el){
    el.addEventListener("keyup", function(){
      update();
    });
    el.addEventListener("change", function(){
      updateInput();
    });
  });
  document.querySelectorAll("[name='sort']").forEach(function(el){
    el.addEventListener("change", function(){
      update();
    });
  });
  byId("preset_import").addEventListener("click", function(){
    var index = presetsEl.value;

    if( presets[index] ){
      input1El.value = presets[index].text;
      update();
    }
  });
  modeEl.addEventListener("click", function(){
    mode = !mode;

    modeEl.textContent = mode ? "暗号生成モード" : "暗号解読モード";
    label2El.textContent = mode ? "平　文" : "暗号文";

    input2El.value = "";

    update();
  });
  byId("copy").addEventListener("click", function(){
    resultEl.select();
    document.execCommand('copy');
    copycheckEl.textContent = "コピーしました。";
    copycheckEl.style.color = "#" + (Math.floor(Math.random() * 16777215) + 1).toString(16);
  });

  for( var i in presets ){
    var elem = document.createElement("option");
    elem.value = i;
    elem.textContent = presets[i].name;

    presetsEl.appendChild(elem);
  }
});
