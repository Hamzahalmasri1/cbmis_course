$('#password, #confirm_password').on('keyup', function () {
  
    if ($('#password').val() == $('#confirm_password').val()) {
      $('#message').html('Matching').css('color', 'green');
      $('#regbtn').attr({disabled:false});
    } else {
      $('#message').html('Not Matching').css('color', 'red');
      $('#regbtn').attr({disabled:true});
    }
  });

  