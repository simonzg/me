var $ = require('jquery');
window.jQuery = window.$ = $;
global.Tether = require('tether');
require('bootstrap');

/*=================================================
=            Image Download Protection            =
=================================================*/
$('img').mousedown(function (e) {
  if(e.button == 2) { // right click
    return false; // do nothing!
  }
}
/*=====  End of Image Download Protection  ======*/


/*===============================
=            Overlay            =
===============================*/
$('#overlay-open-btn').click(()=>{
  $('.overlay').addClass('fadein');
})

$('#overlay-close-btn').click(()=>{
  $('.overlay').removeClass('fadein');
})
/*=====  End of Overlay  ======*/

