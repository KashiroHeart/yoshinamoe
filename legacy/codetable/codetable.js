import { list1, list2, list3, list4 } from "./codes.js";

init(function() {
  var EX = false;

  var selectbox = document.getElementById("nselect");
  var sortbox1 = document.getElementById("nsort1");
  var sortbox2 = document.getElementById("nsort2");
  var thead = document.querySelector("#nlist thead");
  var tbody = document.querySelector("#nlist tbody");
  var form = document.getElementById("nshowing");

  // functions
  var listheadupdate = function(key){
    thead.innerHTML = "";
    var L4 = list4[key];

    // create table header
    var header = document.createElement("tr");
    var numhead = document.createElement("th");
    numhead.textContent = "No.";
    header.appendChild(numhead);
    var param = EX ? Object.assign(L4.param, L4.exparam || {}) : L4.param;
    for ( var i in param ){
      var name = document.createElement("th");
      name.className = "c-"+i;
      name.textContent = param[i];
      header.appendChild(name);
    }
    thead.appendChild(header);
  }
  var listbodyupdate = function(key){
    tbody.innerHTML = "";
    var L2 = [].concat(list2[key]), L4 = list4[key];

    // sorting
    var rule = sortbox1.value.split("-"),
        order = sortbox2.value;

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
      var body = document.createElement("tr");
      var numcell = document.createElement("td");
      numcell.textContent = Number(i)+1;
      body.appendChild(numcell);
      var param = EX ? Object.assign(L4.param, L4.exparam || {}) : L4.param;
      for ( var j in param ){
        var cell = document.createElement("td");
        cell.className = "c-"+j;
        cell.textContent = L2[i][j];
        body.appendChild(cell);
      }
      tbody.appendChild(body);
    }
  }
  var filtering = function(e){
    var checkboxes = document.querySelectorAll("input[type='checkbox']");

    document.querySelectorAll("th, td").forEach(function(cell){
      cell.style.display = "table-cell";
    });
    var unshow = [];
    for( var box of checkboxes ){
      if( box.checked ) continue;
      unshow.push(".c-" + box.getAttribute("name"));
    }
    if( unshow.length ){
      document.querySelectorAll(unshow.join(", ")).forEach(function(cell){
        cell.style.display = "none";
      });
    }
  }
  var listupdate = function(t){
    // get mastertable
    var key = selectbox.value;
    if( !list4[key] ) return;

    // initialize
    sortbox1.innerHTML = "";
    form.innerHTML = "";

    // create sort options
    var def = document.createElement("option");
    def.value = "-";
    def.textContent = "デフォルト";
    sortbox1.appendChild(def);

    for ( var i of list4[key].sort ) {
      var opt = document.createElement("option");
      opt.value = i.rule.join("-");
      opt.textContent = i.name;
      sortbox1.appendChild(opt);
    }

    // create showing options
    var param = EX ? Object.assign(list4[key].param, list4[key].exparam || {}) : list4[key].param;
    for ( var i in param ) {
      var opt = document.createElement("label");
      opt.setAttribute("for", i);
      opt.textContent = param[i];

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = i;
      checkbox.id = i;
      checkbox.checked = true;
      checkbox.addEventListener("change", filtering);
      opt.appendChild(checkbox);

      form.appendChild(opt);
    }

    // update
    if( typeof t=="object" ){
      for ( var i in t ){
        var target = document.getElementById(i);
        if( target ) target.value = t[i];
      }
    }

    listheadupdate(key);
    listbodyupdate(key);
  };

  selectbox.addEventListener("change", function(){
    listupdate();
  });
  [sortbox1, sortbox2].forEach(function(el){
    el.addEventListener("change", function(){
      var key = selectbox.value;
      listbodyupdate(key);
      filtering();
    });
  });

  // create selectbox
  for ( var i in list4 ){
    var opt = document.createElement("option");
    opt.value = i;
    opt.textContent = list3[i];
    selectbox.appendChild(opt);
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
          selectbox.value = key[1];
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
    selectbox.value = "morse";
    listupdate();
  }
});
