import { list1, list2, list3, list4 } from "./codes.js";

$(function() {
  var EX = false;
  
  var selectbox = $("#nselect");
  var sortbox = $("#nsort1, #nsort2");
  
  // functions
  var listheadupdate = function(key){
    var thead = $("#nlist thead");
    thead.html("");
    var L2 = list2[key], L4 = list4[key];
    
    // create table header
    var header = $("<tr></tr>");
    $("<th>No.</th>").appendTo(header);
    var param = EX ? Object.assign(L4.param, L4.exparam || {}) : L4.param;
    for ( var i in param ){
      var name = $("<th></th>");
      name.attr("class", "c-"+i).text(param[i]).appendTo(header);
    }
    thead.append(header);
  }
  var listbodyupdate = function(key){
    var tbody = $("#nlist tbody");
    tbody.html("");
    var L2 = [].concat(list2[key]), L4 = list4[key];
    
    // sorting
    var rule = sortbox.eq(0).val().split("-"),
        order = sortbox.eq(1).val();
    
    var L1 = list1[rule[1]];
    if( L1 ){
      L2 = L2.sort((a,b) => {
        var ind1 = L1.findIndex(x => x == a[rule[0]]),
            ind2 = L1.findIndex(x => x == b[rule[0]]);
        if( Number(order) ){
          if( ind1 == -1 ) ind1 = -L2.length;
          if( ind2 == -1 ) ind2 = -L2.length;
          return ind2 - ind1;
        }else{
          if( ind1 == -1 ) ind1 = L2.length;
          if( ind2 == -1 ) ind2 = L2.length;
          return ind1 - ind2;
        }
      });
    }else{
      if( Number(order) ){
        L2 = L2.sort((a,b) => {
          return L2.indexOf(b) - L2.indexOf(a);
        });
      }else{
        L2 = L2.sort((a,b) => {
          return L2.indexOf(a) - L2.indexOf(b);
        });
      }
    }
    
    // create table body
    for ( var i in L2 ){
      var body = $("<tr></tr>");
      var numcell = $("<td></td>");
      numcell.text(Number(i)+1).appendTo(body);
      var param = EX ? Object.assign(L4.param, L4.exparam || {}) : L4.param;
      for ( var j in param ){
        var cell = $("<td></td>");
        cell.attr("class", "c-"+j).text(L2[i][j]).appendTo(body);
      }
      tbody.append(body);
    }
  }
  var filtering = function(e){
    var checkboxes = $("input[type='checkbox']").toArray();
    
    $("th, td").css("display", "table-cell");
    var unshow = [];
    for( var i of checkboxes ){
      var box = $(i);
      if( box.prop("checked") ) continue;
      unshow.push(".c-" + box.attr("name"));
    }
    $(unshow.join(", ")).css("display", "none");
  }
  var listupdate = function(t){
    // get mastertable
    var key = selectbox.val();
    if( !list4[key] ) return;
    
    // initialize
    var thead = $("#nlist thead");
    var tbody = $("#nlist tbody");
    var sortbox1 = $("#nsort1");
    var sortbox2 = $("#nsort2");
    var form = $("#nshowing");
    
    sortbox1.html("");
    form.html("");
    
    // create sort options
    var def = $("<option value='-'>デフォルト</option>");
    def.appendTo(sortbox1);
    
    for ( var i of list4[key].sort ) {
      var opt = $("<option></option>");
      opt.val(i.rule.join("-")).text(i.name).appendTo(sortbox1);
    }
    
    // create showing options
    var param = EX ? Object.assign(list4[key].param, list4[key].exparam || {}) : list4[key].param;
    for ( var i in param ) {
      var opt = $("<label></label>");
      opt.attr("for", i).text(param[i]);
      
      var checkbox = $("<input type='checkbox'/>");
      checkbox.attr({ name: i, id: i, }).prop("checked", true).on("change", filtering).appendTo(opt);
      
      form.append(opt);
    }
    
    // update
    if( typeof t=="object" ){
      for ( var i in t ){
        $("#"+i).val(t[i]);
      }
    }
    
    listheadupdate(key);
    listbodyupdate(key);
  };
  
  selectbox.on("change", function(){
    listupdate();
  });
  sortbox.on("change", function(){
    var key = selectbox.val();
    listbodyupdate(key);
    filtering();
  });
  
  // create selectbox
  for ( var i in list4 ){
    var opt = $("<option></option>");
    opt.val(i).text(list3[i]).appendTo(selectbox);
  }
  
  // focus to exist option
  if( location.search.startsWith("?") ){
    var keys = location.search.slice(1).split("&");
    var opt = {};
    for ( var req of keys ){
      var key = req.split("=");
      if( !key[1] ) continue;

      switch(key[0]){
        case "table":
          selectbox.val(key[1]);
          break;
        case "sort":
          opt.nsort1 = key[1];
          break;
        case "order":
          opt.nsort2 = key[1];
          break;
        case "ex":
        case "exparam":
          if (key[1] == "true") EX = true;
          break;
      }
    }
    listupdate(opt);
  }else{
    selectbox.val("morse");
    listupdate();
  }
});