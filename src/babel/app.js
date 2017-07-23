var $ = require('jquery');
window.jQuery = window.$ = $;
global.Tether = require('tether');
require('bootstrap');

$('#overlay-open-btn').click(()=>{
  $('.overlay').addClass('fadein');
})

$('#overlay-close-btn').click(()=>{
  $('.overlay').removeClass('fadein');
})
