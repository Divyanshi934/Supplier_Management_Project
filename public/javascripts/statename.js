$(document).ready(function(){
    $.get('/laptop/fetchstatename',{ajax:true},function(data){
        $.each(data,function(index,item){
         $('#statename').append($('<option>').text(item.statename).val(item.stateid))  
        }) 
    })
    $('#statename').change(function(){
        $.get('/laptop/fetchcityname',{ajax:true,tid:$('#statename').val()},function(data){
            $('#cityname').empty()
            $('#cityname').append($('<option>').text('-City-'))
            $.each(data,function(index,item){

                $('#cityname').append($('<option>').text(item.cityname).val(item.cityid))
            })
        })
    })
})