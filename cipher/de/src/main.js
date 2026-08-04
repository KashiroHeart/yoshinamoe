$(function(){
  const selectbox = [
    {
      label: "モールスに変換",
      value: "morse",
    },
    {
      label: "点字に変換",
      value: "braille",
    },
    {
      label: "モールスとして復号",
      value: "de-as-morse",
    },
    {
      label: "点字として復号",
      value: "de-as-braille",
    },
  ];
  
  for( let option of selectbox ){
    let node = $("<option></option>").val(option.value).text(option.label);
  	$("#cipher_type").append(node);
  }
  
  const configure = function(){
    $("#configure");
  }
});