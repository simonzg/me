let $ = require('jquery');
window.jQuery = window.$ = $;
global.Tether = require('tether');
require('bootstrap');

/*======================================
=            Ready Function            =
======================================*/
$(()=>{
  $('#fullpage').fullpage();
  // $('.section').attr('style', 'height:100%');
  // $('.section .fp-tableCell').removeAttr('style');
})
// $(window).resize(()=>{
//   $('.section, .section .fp-tableCell').attr('style', 'height:'+window.innerHeight+'px');
// })
/*=====  End of Ready Function  ======*/



/*=================================================
=            Image Download Protection            =
=================================================*/
$('img').mousedown((e)=> {
  if(e.button == 2) { // right click
    return false; // do nothing!
  }
});
/*=====  End of Image Download Protection  ======*/


/*===============================
=            Overlay            =
===============================*/
$('#overlay-open-btn').click(() => {
  $('.overlay').addClass('fadein');
});

$('#overlay-close-btn').click(() => {
  $('.overlay').removeClass('fadein');
});
/*=====  End of Overlay  ======*/


