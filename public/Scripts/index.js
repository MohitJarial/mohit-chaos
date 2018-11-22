
     /*if ($(window).width() > 1280) {
       screenHeight = $(window).outerHeight(true);
       $('.front').css('height',screenHeight);
     }

     $(window).resize(function(){
       if ($(window).width() > 1280) {
         screenHeight = $(window).outerHeight(true);
         $('.front').css('height',screenHeight);
       }
       else {
         $('.front').css('height','auto');
       }
     });*/

     $(document).ready(function(){
       stepWidth = $('.step_image').width();
       stepHeight=stepWidth*0.6;
       $('.step_image').css('height',stepHeight);

       if ($(window).width() < 767) {
         $('.img-r').each(function(index, elem){
           $(elem).find('.story_content').insertAfter($(elem).find('.story_image'));
         });
       }
       else {   
         $('.img-r').each(function(index, elem){
           $(elem).find('.story_content').insertBefore($(elem).find('.story_image'));
         }); 
       }
     });

     $(window).resize(function(){
       stepWidth = $('.step_image').width();
       stepHeight=stepWidth*0.6;
       $('.step_image').css('height',stepHeight);

       if ($(window).width() < 767) {
         $('.img-r').each(function(index, elem){
           $(elem).find('.story_content').insertAfter($(elem).find('.story_image'));
         });
       }
       else {
         $('.img-r').each(function(index, elem){
           $(elem).find('.story_content').insertBefore($(elem).find('.story_image'));
         }); 
       }
     });

    function SaveNotification(){
      $('#lblErrorMsg').text('');
      var email = $('#txtEmail').val();
      $('#txtEmail').val($.trim($('#txtEmail').val()));
      $('#txtEmail2').val($.trim($('#txtEmail2').val())); 
      if(email ==''){
        $('#lblErrorMsg').text('Please enter email');
        $('#lblErrorMsg').show().fadeOut(3000);
        return false;
      }
      else if(!validateEmail(email)){
        $('#lblErrorMsg').text('Please enter valid email');
        $('#lblErrorMsg').show().fadeOut(3000);
        return false;
      }
      else{
        $.ajax({ 
          type: 'POST', 
          url: '/SaveNotification', 
          data: { email: email }, 
          dataType: 'json',
          success: function (data) { 
            $('#txtEmail').val('');
            $('#txtEmail2').val('');
            $('#popupNotifications').show();
            $('body').attr('class','modal-open');
          }
        });
       
      }    
    }
    
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }   
    
    $('.btnClosePopup').click(function(){
       $('#popupNotifications').hide();
       $('body').removeClass('modal-open');
    });
     
    function SaveNotification2(){
      $('#lblErrorMsg2').text('');
      var email = $('#txtEmail2').val();
      $('#txtEmail').val($.trim($('#txtEmail').val()));
      $('#txtEmail2').val($.trim($('#txtEmail2').val()));
      if(email ==''){
        $('#lblErrorMsg2').text('Please enter email');
        $('#lblErrorMsg2').show().fadeOut(3000);
        return false;
      }
      else if(!validateEmail(email)){
        $('#lblErrorMsg2').text('Please enter valid email');
        $('#lblErrorMsg2').show().fadeOut(3000);
        return false;
      }
      else{
        $.ajax({ 
          type: 'POST', 
          url: '/SaveNotification', 
          data: { email: email }, 
          dataType: 'json',
          success: function (data) {
            $('#txtEmail').val('');                                                       
            $('#txtEmail2').val('');
            $('#popupNotifications').show();
            $('body').attr('class','modal-open');
          }
        });
      }
             
    }

   /*$('.bottom-scroll').click(function(){
      $(this).css('color','#d4d4d4');         
    });

    $(".bottom-scroll").hover(function() {
      $(this).css("color","#e24a81");
    });*/
    
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
          return false;
          }
        }
     });
   });

