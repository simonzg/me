let $ = require('jquery');
window.jQuery = window.$ = $;
global.Tether = require('tether');
require('bootstrap');



/*============================================================
=            Mouse In/Out/Click for project image            =
============================================================*/

$('.sided-wrapper .image-wrapper').mouseenter((e)=>{
  var link = $(e.target).parent().parent().find('.detail-link');
  link.addClass('active');
});
$('.sided-wrapper .image-wrapper').mouseout((e)=>{
  var link = $(e.target).parent().parent().find('.detail-link');
  link.removeClass('active');
});
$('.sided-wrapper .image-wrapper').click((e)=>{
  var link = $(e.target).parent().parent().find('.detail-link');
  window.location.href=link.attr('href');
});
/*=====  End of Mouse In/Out/Click for project image  ======*/




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


