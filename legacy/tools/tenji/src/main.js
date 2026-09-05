import {
  braille6Table,
  braille8Table,
  braille2Kanji,
  braille2Kana,
  braille2KanaTable
}
from "./rules.js";
import {
  getAllCombinations
}
from "./combination.js";
$(function() {
  const getInput = function() {
    return $("#input").val();
  }
  const setOutput = function(v) {
    $(".area, .result").css("display", "none");
    $(".area").eq(0).css("display", "block");
    $(".result").eq(0).css("display", "block");
    $("#output").val(v);
  }
  const simulateExport = function(table) {
    $(".area, .result").css("display", "none");
    $(".area").eq(1).css("display", "block");
    $(".result").eq(1).css("display", "block");
    $("#table_body").empty();
    for (let content of table) {
      let layer = $("<tr></tr>");
      $("<td></td>").text(content[0]).appendTo(layer);
      $("<td></td>").text(content[1]).appendTo(layer);
      layer.appendTo("#table_body");
    }
  }
  const err = function(e) {
    console.error(e);
    return "?";
  }
  
  const t2k = function(input) {
    let binaryInput = input.split("").map(m => braille6Table.indexOf(m)).map(m => m > 0 ? m.toString(2) : "0").map(m => "0".repeat(6 - m.length) + m);
    let index = "";
    
    let kanaInput = [];
    for (let binary of binaryInput) {
      console.log("bin:", binary);
      let char = braille2Kana.find(dic => dic[2] == parseInt(binary, 2))?.[0];
        
      if (char) {
        kanaInput.push(char);
      } else {
        kanaInput.push(binary);
      }
    }
    
    console.log(kanaInput);
        
    let converted = kanaInput.join("");
    return converted;
  };
  
  const k2t = function() {
    let input = getInput();
    let result = [];
    for (let char of input) {
      let dex = braille2Kana.find(dic => dic[0] == char);
      if (!dex) {
      	err("変換できない文字が含まれています。：" + char);
      	continue;
      }

      let bin = dex[1].toString(2);
      if (!bin) {
      	err("バイナリへの変換に失敗しました。：" + dex[1]);
      	continue;
      }

      for (let i = Math.ceil(bin.length / 6) - 1; i >= 0; i--) {
        let currentByte = dex[1] >> (i * 6) & 0xFF;
        result.push(braille6Table[currentByte]);
      }
    }
    
    return result.join("");
  };
  
  const k2kt = function() {
    let input = getInput();
    let result = [];
    for (let char of input) {
      let dex = braille2Kanji.find(dic => dic[0] == char);
      if (!dex){
      	return err("変換できない文字が含まれています。：" + char);
      	continue;
      }
      console.log(dex);
      let bin = dex[1].toString(2);
      if (!bin){
      	err("バイナリへの変換に失敗しました。：" + dex[1]);
      	continue;
      }
      console.log(bin);
      for (let i = Math.ceil(bin.length / 8) - 1; i >= 0; i--) {
        let currentByte = dex[1] >> (i * 8) & 0xFF;
        result.push(braille8Table[currentByte]);
      }
    }
    return result.join("");
  };
  
  const k2kt2 = function(input) {
    let result = [];
    for (let char of input) {
      let dex = braille2Kanji.find(dic => dic[0] == char);
      if (!dex) return err("変換できない文字が含まれています。：" + char);
      console.log(dex);
      let bin = dex[2].toString(2);
      if (!bin) return err("バイナリへの変換に失敗しました。");
      console.log(bin);
      for (let i = Math.ceil(bin.length / 8) - 1; i >= 0; i--) {
        let currentByte = dex[2] >> (i * 8) & 0xFF;
        result.push(braille8Table[currentByte]);
      }
    }
    return result.join("");
  }
  
  const kt2k = function(input) {
    let binaryInput = input.split("").map(m => braille8Table.indexOf(m)).map(m => m > 0 ? m.toString(2) : "0").map(m => "0".repeat(8 - m.length) + m);
    let kanjiInput = [];
    let index = "";
    let isKanji = false;
    for (let binary of binaryInput) {
      index += binary;
      // 漢字判定開始
      if (binary[0] == 1) {
        isKanji = true;
      }
      // 漢字判定終了
      if (binary[4] == 1 && isKanji) {
        console.warn(index);
        let char = braille2Kanji.find(dic => dic[1] == parseInt(index, 2))?.[0];
        if (char) {
          kanjiInput.push(char);
        } else {
          kanjiInput.push(index);
        }
        isKanji = false;
        index = "";
      } else if (!isKanji) {
        kanjiInput.push(binary);
        index = "";
      }
    }
        
    console.log(kanjiInput);
    
    binaryInput = kanjiInput.map(m => {
        if( m.length >= 8 ) return m.match(/.{8}/g);
        return m;
    }).flat();
    let kanaInput = [];
    for (let binary of binaryInput) {
      let char = braille2Kana.find(dic => dic[3] == parseInt(binary, 2))?.[0];
        
      if (char) {
        kanaInput.push(char);
      } else {
        kanaInput.push(binary);
      }
    }
    
    console.log(kanaInput);
        
    let converted = kanaInput.join("");
    return converted;
  };
        
  const forcefix = function(input) {
    let binaryInput = input.split("")
        .map(m => braille8Table.indexOf(m)).map(m => m > 0 ? m.toString(2) : "0").map(m => "0".repeat(8 - m.length) + m)
          .map(m => [m[3], m[0], m[1], m[2], m[7], m[4], m[5], m[6]]);
    let patterns = getAllCombinations(input.length);
    console.log(binaryInput);
    let result = [];
    for (let pattern of patterns) {
      let binPattern = pattern.map(m => ["11", "1001", "100001"][m - 1]).join("").match(/.{2}/g);
      let braille = [];
      for (let i = 0; i < binaryInput.length; i++) {
        [binaryInput[i][0], binaryInput[i][4]] = [...binPattern[i]];
        let entry = binaryInput[i].join("");
        console.warn(entry);
        braille.push(braille8Table[parseInt(entry, 2)]);
      }
      console.log(braille);
      result.push([braille.join(""), kt2k(braille.join(""))]);
    }
    return result;
  };
        
  const change = function() {
    let input = getInput();
    switch ($("select#tenji").val()) {
      case "k2t":
        setOutput(k2t(input));
        break;
      case "t2k":
        setOutput(t2k(input));
        break;
      case "k2kt":
        setOutput(k2kt(input));
        break;
      case "kt2k":
        setOutput(kt2k(input));
        break;
      case "k2kt2":
        setOutput(k2kt2(input));
        break;
      case "forcefix":
        $(".area, .result").css("display", "none");
        $(".area").eq(1).css("display", "block");
        $(".result").eq(1).css("display", "block");
        break;
    }
  };
  $("select#tenji").on("change", change);
  $("#input").on("keyup", change);
        
  $("button#tenji_run").on("click", function() {
    let input = getInput();
    switch ($("select#tenji").val()) {
      case "k2t":
        setOutput(k2t(input));
        break;
      case "t2k":
        setOutput(t2k(input));
        break;
      case "k2kt":
        setOutput(k2kt(input));
        break;
      case "kt2k":
        setOutput(kt2k(input));
        break;
      case "k2kt2":
        setOutput(k2kt2(input));
        break;
      case "forcefix":
        simulateExport(forcefix(input));
        break;
    }
  });
});