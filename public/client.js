//console.log('hi');

// I hope I can fix this mess with angular...
// Bug: 
// Given Dashboard home page
// when the menu bar is clicked
// It hides the sidebar
// Expected results: it shouldn't

$(document).ready(function(){
  // Listener for the menu clickable thingy
  $("a.mobile").click(function(){
    $(".sidebar").slideToggle('fast');
  })
});

// Fixes a resize bug with the side bug
window.onresize = function(event) {
  if($(window).width() > 480) {
    $(".sidebar").show();
  }
}