$(document).ready(function(){
    
      $('form').on('submit', function(){
    
          var item = $('form input');
          var todo = {item: item.val().trim()};
    
          $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data){ 
              //location.reload();
              $(".tasklist").html(data);
              $('form input').val('').focus();
              bindClick(); 
            }
          });          

          return false;
      });
    
      bindClick(); 
    
});

function bindClick(){
  $('.tasklist li').on('click', function(){ 
          var itemId = $(this).attr("rel") ;

          $.ajax({
            type: 'DELETE',
            url: '/todo/' + itemId,
            success: function(data){
              //location.reload();
              $('form input').val('').focus();
              $(".tasklist").html(data);  
              bindClick();
            }
          });
      });
}
