/* ************************************************** **

	RurunaOS: おかえりなさい！
    		: Welcome back!
    		: 双迎回来！
    		: 어서 와요!

** ************************************************** */

$(function(){
  $(document).pjax('a.pjax-link', {
    container:'#article',
    fragment: '#article',
    timeout: Math.ceil( 0xe6a998 / 500 ),
  });
  
  let state = false;
  $(".sidemenu-trigger").on("click", function(){
   	state = !state;
    
    $(".sidemenu").animate({
      marginLeft: state ? 0 : "-18em",
  	}, 300);
  });
  
  /* リンクを押したらメニューを閉じるコード
  $(".sidemenu-list-url").on("click", function(){
    if( !state ) return;
   	state = false;
    
    $(".sidemenu").animate({
      marginLeft: "-18em",
  	}, 300);
  });
  */
});