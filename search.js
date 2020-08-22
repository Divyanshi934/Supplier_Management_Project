$.get('/laptop/displayallJSON',{ajax:true,txt:''},function(data){
    var output="<center><Table border='1' cellspacing='10' cellpadding='10'>" 
    var i=1
       $.each(data,function(index,item){
         if(i==1){
             output+="<tr>"
         }
         output+="<th><img src=/images/"+item.picture+" width='150' height='150' ><br>"+item.suppliername+"</th>"
         i++
         if(i==5)
         {output+="</tr>"
         i=1}
        })
        output+="</table></center>"
        $('#result').html(output)
   })

 $('#txt').keyup(function(){

   $.get('/laptop/displayallJSON',{ajax:true,txt:$("#txt").val()},function(data){
       var output="<center><Table border='1' cellspacing='10' cellpadding='10'>" 
       var i=1
          $.each(data,function(index,item){
            if(i==1){
                output+="<tr>"
            }
            output+="<th><img src=/images/"+item.picture+" width='150' height='150' ><br>"+item.suppliername+"</th>"
            i++
            if(i==5)
            {output+="</tr>"
            i=1}
           })
           output+="</table></center>"
           $('#result').html(output)
      })



 })




