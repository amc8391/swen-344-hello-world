$(document).ready(function() {
  // Set up the datepicker
  $('#datePicker').datepicker();
  
  // Set up the draggable
  $('#draggable').draggable();

  // Set up the image carousel
  $('.slick-thing').slick({arrows: true});

  // Set up the dialog
  $('.dialog').dialog();
});