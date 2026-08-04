/***
	this script requires jQuery, hangul-js
***/

$(function(){
  // プリセット定義
  const CIPHER_PRESETS = {
    "0": "123456789abcdefghijklmnopqrstuvwxyz".split(""),
    "1": "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん".split(""),
    "2": "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせすん".split(""),
  };
  const RAW_PRESETS = {
    "0": "abcdefghiklmnopqrstuvwxyz".split(""),
    "1": "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん".split(""),
    "2": "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせすん".split(""),
    "3": "ㅂㅃㅈㅉㄷㄸㄱㄲㅅㅆㅛㅕㅑㅐㅒㅔㅖㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡ".split(""),
  };

  // 任意幅の二次元配列を生成
  const dim2Array = function(n){
    const array = [];
    for( let i=0;i<n;i++ ) array.push([]);
    return array;
  }
  
  const createArray = {
    // 横配列
    row(max){
      let min = 1;
      let list = dim2Array(max);

      let i = 0;
      for( let x=0;x<max;x++ ){
        for( let y=0;y<max;y++ ){
          list[x][y] = i;
          i++;
        }
      }

      return list;
    },
    // 縦配列
    col(max){
      let min = 1;
      let list = dim2Array(max);

      let i = 0;
      for( let x=0;x<max;x++ ){
        for( let y=0;y<max;y++ ){
          list[y][x] = i;
          i++;
        }
      }

      return list;
    },
    // 横渦配列
    rowVortex(max){
      let min = 1;
      let list = dim2Array(max);
      const RANGE = max ** 2;
      let x = 1;
      let y = 1;

      for( let i=0;i<RANGE;i++ ){
        list[y-1][x-1] = i;
        if( x == min && y == min+1 ){
          min++;
          max--;
          x++;
        }else if( x != max && y == min ){
          x++;
        }else if( x == max && y != max ){
          y++;
        }else if( x == min ){
          y--;
        }else if( y == max ){
          x--;
        }
      }

      return list;
    },
    // 縦渦配列
    colVortex(max){
      let min = 1;
      let list = dim2Array(max);
      const RANGE = max ** 2;
      let x = 1;
      let y = 1;

      for( let i=0;i<RANGE;i++ ){
        list[y-1][x-1] = i;
        if( x == min+1 && y == min ){
          min++;
          max--;
          y++;
        }else if( x == min && y != max ){
          y++;
        }else if( y == min && x != min ){
          x--;
        }else if( x == max ){
          y--;
        }else if( y == max ){
          x++;
        }
      }

      return list;
    }
  }
  
  const form = document.forms.tool_input;
  
  // 表プレビューの更新
  const updatePreview = function(){
    let valueByArea = $("#polybius_rawarray_textarea").val();
    let value = valueByArea.split("");
    let cipherByArea = $("#polybius_array_textarea").val();
    let cipher = cipherByArea.split("");
  
  	let size = Math.ceil( Math.sqrt(value.length) );
  
    // 表の整列条件
  	let array;
  	switch( form.set_table_sorting.value ){
      case "0":
        array = createArray.row(size);
        break;
      case "1":
        array = createArray.col(size);
        break;
      case "2":
        array = createArray.rowVortex(size);
        break;
      case "3":
        array = createArray.colVortex(size);
        break;
    }
    
    // 表の始点
    switch( form.set_table_layout.value ){
      case "0":
        // デフォルト
        break;
      case "1":
        for( let x=0;x<array.length;x++ ){
          array[x] = array[x].reverse();
        }
        break;
    }
    let LAYOUT_FLAG = form.set_table_layout.value=="0";
  
  	// 表生成
  	$("#preview").empty();
  	for( let y=0;y<array.length + 1;y++ ){
      const $tableRow = $("<tr></tr>");
      let xMax = (array[y] ?? array[0]).length + 1;
      for( let x=0;x<xMax;x++ ){
        if( y<=0 ){
          if( LAYOUT_FLAG ){
            // LAYOUT_FLAG == true (左上始点) なら
            $tableRow.append( $("<th>" + `${ cipher[x-1] ?? "?" }` + "</th>") );
          }else{
            // LAYOUT_FLAG == false (右上始点) なら
	        $tableRow.append( $("<th>" + `${ cipher[(xMax-2)-x] ?? "?" }` + "</th>") );
          }
        }else if( LAYOUT_FLAG ? x<=0 : x>=xMax-1 ){
          $tableRow.append( $("<th>" + `${ cipher[y-1] ?? "?" }` + "</th>") );
        }else{
          let char = value[ LAYOUT_FLAG ? array[y-1][x-1] : array[y-1][x] ];
          $tableRow.append( $("<td>" + (char ?? " ") + "</td>") );
        }
      }
      $("#preview").append( $tableRow );
    }
  }
  
  // 変換
  const convertToCipher = function(){
    let rawByArea = $("#rawtext_input_textarea").val();
    let valueByArea = $("#polybius_rawarray_textarea").val();
    let value = valueByArea.split("");
    let cipherByArea = $("#polybius_array_textarea").val();
    let cipher = cipherByArea.split("");

    let size = Math.ceil( Math.sqrt(value.length) );

    let array;
    switch( form.set_table_sorting.value ){
      case "0":
        array = createArray.row(size);
        break;
      case "1":
        array = createArray.col(size);
        break;
      case "2":
        array = createArray.rowVortex(size);
        break;
      case "3":
        array = createArray.colVortex(size);
        break;
    }
    
    // 二次元配列からプレビュー通りの表を生成
    for( let y=0;y<array.length;y++ ){
      for( let x=0;x < (array[y] ?? array[0]).length;x++ ){
        array[y][x] = value[ array[y][x] ];
      }
    }
    
    // 変換方式で分岐
    if( $("#convert_type").val() == "0" ){
      // 平文→暗号文
      let raw = rawByArea.split("");
      
      // 表再現配列をもとに変換
      let RESULT = [];
      for( let char of raw ){
        // 特殊置換
        if( char == " " || char == "　" ){
          RESULT.push(char);
          continue;
        }

        // 探査
        let FOUND_FLAG = false;
        for( let y=0;y<array.length;y++ ){
          for( let x=0;x < (array[y] ?? array[0]).length;x++ ){
            if( array[y][x] == char ){
              RESULT.push( cipher[ x ] );
              RESULT.push( cipher[ y ] );

              FOUND_FLAG = true;
            }
          }
        }

        if( !FOUND_FLAG ) {
          RESULT.push( "??" );
        }
      }

      $("#rawtext_output_textarea").val( RESULT.join("") );
    }else{  
  	  // 暗号文→平文
      let raw = rawByArea.split(/\s+/).join("  ").match(/.{2}/g);
      if( !raw ) raw = [];
      
      let RESULT = [];
      console.log(array);
      
      for( let xy of raw ){
        if( xy == "  " ){
          RESULT.push(" ");
          continue;
        }
        let x = cipher.indexOf(xy[0]),
            y = cipher.indexOf(xy[1]);
        
        if( x!=-1 && y!=-1 ){
          if( array?.[y]?.[x] ){
	        RESULT.push( array[y][x] );
          }else{
            RESULT.push( "?" );
          }
        }
      }
      
      $("#rawtext_output_textarea").val( RESULT.join("") );
    }
  }
  
  // 暗号方式更新時イベント
  $("#convert_type").on("change", function(){
    let inputArea = $("#rawtext_input_textarea").val();
    let outputArea = $("#rawtext_output_textarea").val();
    
    $("#rawtext_input_textarea").val(outputArea);
    $("#rawtext_output_textarea").val();
    
    convertToCipher();	// 変換を更新
    updatePreview();	// プレビューを更新
  });
  
  // preset更新時イベント
  $("#polybius_array_cipher").on("change", function(){
    let value = $("#polybius_array_cipher").val();
    
    $("#polybius_array_textarea").prop("readonly", true);
    switch( value ){
      case "0":
      case "1":
        $("#polybius_array_textarea").val( CIPHER_PRESETS[value].join("") );
        break;
      case "2":
  		$("#polybius_array_textarea").prop("readonly", false);
        break;
    }
    convertToCipher();	// 変換を更新
    updatePreview();	// プレビューを更新
  });
  $("#polybius_array_raw").on("change", function(){
    let value = $("#polybius_array_raw").val();
    
    $("#polybius_rawarray_textarea").prop("readonly", true);
    switch( value ){
      case "0":
      case "1":
      case "2":
        $("#polybius_rawarray_textarea").val( RAW_PRESETS[value].join("") );
        break;
      case "3":
  		$("#polybius_rawarray_textarea").prop("readonly", false);
        break;
    }
    convertToCipher();	// 変換を更新
    updatePreview();	// プレビューを更新
  });
  
  // input更新時イベント
  const inputUpdateEvent = function(){
    // 各更新イベントを発火
    convertToCipher();	// 変換を更新
    updatePreview();	// プレビューを更新
    
    // 文字数の表示を更新
    let rawTextInput = $("#rawtext_input_textarea").val();
    $("#rawtext_input_length").text(rawTextInput.length);
    
    let arrayTextarea = $("#polybius_array_textarea").val();
    arrayTextarea = arrayTextarea?.split("") ?? [];
    $("#polybius_array_textarea_length").text(arrayTextarea.length);
    
    // ???
    let arrayRawTextarea = $("#polybius_rawarray_textarea").val();
    arrayRawTextarea = arrayRawTextarea?.split("") ?? [];
    $("#polybius_rawarray_textarea_length").text(arrayRawTextarea.length);
    
    let outputArea = $("#rawtext_output_textarea").val();
    $("#rawtext_output_length").text(outputArea.lnegth);
  }
  
  // 入力検知
  $("#rawtext_input_textarea").on("change, keyup", inputUpdateEvent);
  $(form.set_table_layout).on("change", inputUpdateEvent);
  $(form.set_table_sorting).on("change", inputUpdateEvent);
  
  // 起動時に実行
  inputUpdateEvent();
});