$(document).ready(function(){
       $('#rollsubmit').click(function (e) { 
        e.preventDefault();
        var ran = Math.floor(Math.random()*6)+1;
        $('#result').attr('src', ran+".JPG");
    });

    $('#backtotop').click(function (e) { 
        e.preventDefault();
        // window.scrollTo(500, 0);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    $("body").on("contextmenu",function(){
        return false;
     }); 

     
     $('#checkmain').change(function () {
        $('#rollsubmit').prop("disabled", !this.checked);
    }).change()

     

})