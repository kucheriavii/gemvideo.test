

$(function() {
          	$('.filtr-title').click(function() {
                   $('.filtr-content').toggle();
            });     
        }); 

$(function() {
          	$('.cl-fx').click(function() {
                   $('.cl-kh').toggle();
            });     
        });    

$(function() {
          	$('.cl-sh').click(function() {
                   $('.cl-show').css("display", "block");
            });     
        });







$(function() {
          	$('.cl-fx2').click(function() {
                   $('.cl-kh2').toggle();
            });     
        });    

$(function() {
          	$('.cl-sh2').click(function() {
                   $('.cl-show2').css("display", "block");
            });     
        });



jQuery(document).ready(function(){
 	$('.toggle-menu-btn').click(function() {
 		$(this).next('div').toggle();
 		$(this).find('span').toggle();		
 	});
 	
 	
 	$('.filtr-title').click(function() {
 		$(this).next('.filtr-content').toggle();
 		$(this).find('span').toggle();		
 	});
 	
 	$('.collapse-block-button').click(function() {
 		$(this).parent().parent().next(".collapse-block-content").toggle();
 		$(this).find('span').toggle();		
 	});
 	
 	
 	$(".selectbox, .checkbox, .radio").styler();
 	
 	
 		
	var clickEvent = false;
	$('#myCarousel').on('click', '.nav a', function() {
			clickEvent = true;
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.nav').children().length -1;
			var current = $('.nav li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.nav li').first().addClass('active');	
			}
		}
		clickEvent = false;
	});

	
 	
	$(".tbm-tabs").easytabs({
		updateHash: false
	});  
	
	$('#tab-container').easytabs({
	 
	});
	
	
	jQuery.datetimepicker.setLocale('ru');
	$("#datetimepicker1, #datetimepicker2").datetimepicker({
		timepicker: false
	});
	
	 
	
	
	$("#tbm-cvv-tabs ul a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $("#tbm-cvv-tabs").find(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
    
    $("#tbm-tpp-tabs ul a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href"),
        	tbmTab = $("#tbm-tpp-tabs");
        $("#tbm-tpp-tabs").find(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
    
     $("#tbm-jewelry-tabs ul a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href"),
        	tbmTab = $("#tbm-tpp-tabs");
        $("#tbm-jewelry-tabs").find(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
		 
	
});

$(function() {
	 
	$(".fancy-btn").fancybox({
		afterClose: function() {
		    $(".fancy-btn").show();
		}
	});
});
/*
$(window).scroll(function() {
	
});


$(window).one( "scroll", function() { 
	$('html, body').animate({
        scrollTop: $("#header-block").offset().top
    }, 1500); 	
} );*/







jQuery("#slider").slider({
	min: 0,
	max: 20,
    step: 0.1,
	values: [5,15],
	range: true,
	stop: function(event, ui) {
		jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
		jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
    },
    slide: function(event, ui){
		jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
		jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
    }
});
$("#slider2").slider({
	min: 0,
	max: 20,
    step: 0.1,
	values: [5,15],
	range: true,
	stop: function(event, ui) {
		$("input#minCost2").val($("#slider2").slider("values",0));
		$("input#maxCost2").val($("#slider2").slider("values",1));
    },
    slide: function(event, ui){
		$("input#minCost2").val($("#slider2").slider("values",0));
		$("input#maxCost2").val($("#slider2").slider("values",1));
    }
});

jQuery("input#minCost").change(function(){
	var value1=jQuery("input#minCost").val();
	var value2=jQuery("input#maxCost").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minCost").val(value1);
	}
	jQuery("#slider").slider("values",0,value1);	
});

	
jQuery("input#maxCost").change(function(){
	var value1=jQuery("input#minCost").val();
	var value2=jQuery("input#maxCost").val();
	
	if (value2 > 1000) { value2 = 1000; jQuery("input#maxCost").val(1000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxCost").val(value2);
	}
	jQuery("#slider").slider("values",1,value2);
});

jQuery("input#minCost2").change(function(){
	var value1=jQuery("input#minCost2").val();
	var value2=jQuery("input#maxCost2").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minCost2").val(value1);
	}
	jQuery("#slider2").slider("values",0,value1);	
});

	
jQuery("input#maxCost2").change(function(){
	var value1=jQuery("input#minCost2").val();
	var value2=jQuery("input#maxCost2").val();
	
	if (value2 > 1000) { value2 = 1000; jQuery("input#maxCost2").val(1000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxCost2").val(value2);
	}
	jQuery("#slider2").slider("values",1,value2);
});


$(function() {
          	$('.infs').click(function() {
                   $('.inf').toggle();
            });     
        }); 




$(document).mouseup(function (e) {
    var container = $(".inf");
    if (container.has(e.target).length === 0){
        container.hide();
    }
});




$(function() {
          	$('.infs2').click(function() {
                   $('.inf2').toggle();
            });     
        }); 




$(document).mouseup(function (e) {
    var container = $(".inf2");
    if (container.has(e.target).length === 0){
        container.hide();
    }
});





$(function() {
          	$('.inds').click(function() {
                   $('.ind').toggle();
            });     
        }); 




$(document).mouseup(function (e) {
    var container = $(".ind");
    if (container.has(e.target).length === 0){
        container.hide();
    }
});








$(function() {
          	$('.inds2').click(function() {
                   $('.ind2').toggle();
            });     
        }); 




$(document).mouseup(function (e) {
    var container = $(".ind2");
    if (container.has(e.target).length === 0){
        container.hide();
    }
});






$(function() {
          	$('.inds3').click(function() {
                   $('.ind3').toggle();
            });     
        }); 




$(document).mouseup(function (e) {
    var container = $(".ind3");
    if (container.has(e.target).length === 0){
        container.hide();
    }
});









$(function() {
          	$('.inds4').click(function() {
                   $('.ind4').toggle();
            });     
        }); 




$(document).mouseup(function (e) {
    var container = $(".ind4");
    if (container.has(e.target).length === 0){
        container.hide();
    }
});






$(function() {
          	$('.inds5').click(function() {
                   $('.ind5').toggle();
            });     
        }); 




$(document).mouseup(function (e) {
    var container = $(".ind5");
    if (container.has(e.target).length === 0){
        container.hide();
    }
});







$(function() {
          	$('.inds6').click(function() {
                   $('.ind6').toggle();
            });     
        }); 




$(document).mouseup(function (e) {
    var container = $(".ind6");
    if (container.has(e.target).length === 0){
        container.hide();
    }
});
