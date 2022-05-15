$(document).ready(function() {
  $('.custom-control-input').click(function() {
    if ($('.custom-control-input').is(':checked')) {
      $('body').attr('class', 'dark-mode');
    } else {
      $('body').removeAttr('class');
    }
  });
});
