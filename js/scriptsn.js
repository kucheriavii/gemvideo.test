var deviceAgent = navigator.userAgent.toLowerCase();
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
var eventName = (agentID) ? "touchstart" : "click";

/* faq-page */
$(function(){
   $('.faq-page .arrow').click(function(){
       $('.faq-page .answer').slideUp();
       $('.faq-page .arrow').removeClass('active');
       $(this).addClass('active');
       $(this).prev('.answer').slideDown();
   }) 
   
   $(".stones-block .carousel1").jCarouselLite({
        btnNext: ".next1",
        btnPrev: ".prev1",
        visible: 3
    });
    $(".stones-block .carousel2").jCarouselLite({
        btnNext: ".next2",
        btnPrev: ".prev2",
        visible: 3
    });
    $(".stones-block .carousel3").jCarouselLite({
        btnNext: ".next3",
        btnPrev: ".prev3",
        visible: 3
    });
});

$('.login_link').fancybox();

/* calendar */
$('.pickdate').datepick({dateFormat: 'dd.mm.yyyy'});

/*$(function() {
    $( "#datepicker" ).datepicker({
      showOn: "button",
      buttonImage: "images/calendar_icon.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
  });

$(function() {
    $( ".datepicker" ).datepicker({
      showOn: "button",
      buttonImage: "images/calendar_icon.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
  });*/

/* how it work */
$(".how-page .video a").click(function() {
	$.fancybox({
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'title'			: this.title,
			'width'		: 680,
			'height'		: 495,
			'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
			'type'			: 'swf',
			'swf'			: {
			   	 'wmode'		: 'transparent',
				'allowfullscreen'	: 'true'
			}
		});

	return false;
});

/* Второе модальное окно, в дополнение к fancybox */
var overlay = $('#overlay'); // пoдлoжкa, дoлжнa быть oднa нa стрaнице
var open_modal = $('.open_modal'); // все ссылки, кoтoрые будут oткрывaть oкнa
var close = $('.modal_close, #overlay'); // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa
var modal = $('.modal_div'); // все скрытые мoдaльные oкнa

 open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
	 event.preventDefault(); // вырубaем стaндaртнoе пoведение
	 var div = $(this).attr('href'); // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
	 overlay.fadeIn(400, //пoкaзывaем oверлэй
		 function(){ // пoсле oкoнчaния пoкaзывaния oверлэя
			$('html').addClass('no_hidden');
			var overlay_width = $(div).find('.modal_div_width').width()/2;
			 $(div) // берем стрoку с селектoрoм и делaем из нее jquery oбъект
				 .css('display', 'block')
				 .css('margin-left',-overlay_width+'px') 
				 .animate({opacity: 1, top: '5%'}, 200); // плaвнo пoкaзывaем
	 });
 });
 close.click( function(){ // лoвим клик пo крестику или oверлэю
		modal // все мoдaльные oкнa
		 .animate({opacity: 0, top: '5%'}, 200, // плaвнo прячем
			 function(){ // пoсле этoгo
				 $(this).css('display', 'none');
				 overlay.fadeOut(400); // прячем пoдлoжку
				 $('html').removeClass('no_hidden');
			 }
		 );
 });

/* карточка объекта */
$('#tabs').tabs();
$('.fancy').fancybox({
	'autoScale': false,
	'autoDimensions': false,
	'scrolling': 'no'
});
$('.cert').fancybox();

$(function() {
    $('.object-page #gallery img').click(function(){
        var pic = $(this).attr('src');
        $('.object-page .foto-big a').attr('href',pic);
        $('.object-page .foto-big img').attr('src',pic);
    })
});

$(function() {
    $('.diamond-gal .small-fotos img').click(function(){
        var pic = $(this).attr('src');
        $('.diamond-gal .small-fotos li').removeClass('current');
        $(this).parent().addClass('current');
        $('.diamond-gal .big-foto a').attr('href',pic);
        $('.diamond-gal .big-foto img').attr('src',pic);
    })
});

$(document).ready(function() {
    $('.oprava .more-info1').toggle(
        function(){
        $('.oprava .stones1 .hidden').addClass('visible');
        $('.oprava .stones1 .hidden').removeClass('hidden');
        $(this).text('Свернуть');
        $(this).addClass('close1');
        $(this).removeClass('more-info1');
    },  
        function(){
        $('.oprava .stones1 .visible').addClass('hidden');
        $('.oprava .stones1 .visible').removeClass('visible');
        $(this).text('Больше информации');
        $(this).addClass('more-info1');
        $(this).removeClass('close1');    
    }
    );
   $('.oprava .more-info2').toggle(
        function(){
        $('.oprava .stones2 .hidden').addClass('visible');
        $('.oprava .stones2 .hidden').removeClass('hidden');
        $(this).text('Свернуть');
        $(this).addClass('close2');
        $(this).removeClass('more-info2');
    },
        function(){
        $('.oprava .stones2 .visible').addClass('hidden');
        $('.oprava .stones2 .visible').removeClass('visible');
        $(this).text('Больше информации');
        $(this).addClass('more-info2');
        $(this).removeClass('close2');    
    }
   );
    
});

/* jewelry list */
$(function() {
    $('.j-types ul li').click(function(){
        $('.j-types ul li').removeClass('active');
        $(this).addClass('active');
    });
});

$(function() {
    $('.hide-filter').click().toggle(
      function(){
        $(this).addClass('open-filter');    
        $(this).removeClass('hide-filter');
        $(this).text('показать фильтр');
        $('.filter-body').slideUp();
        $('.filter-body').removeClass('.opened');
      },
      function(){
        $(this).addClass('hide-filter');    
        $(this).removeClass('open-filter');
        $(this).text('скрыть фильтр');
        $('.filter-body').slideDown();
        $('.filter-body').addClass('.opened');
      }    
    )
    $('.open-filter').click().toggle(
        function(){
        $(this).addClass('hide-filter');    
        $(this).removeClass('open-filter');
        $(this).text('скрыть фильтр');
        $('.filter-body').slideDown();
        $('.filter-body').addClass('.closed');
      }, 
      function(){
        $(this).addClass('open-filter');    
        $(this).removeClass('hide-filter');
        $(this).text('показать фильтр');
        $('.filter-body').slideUp();
        $('.filter-body').removeClass('.closed');
      }
         
    )
});

$('.j-tabs').tabs();

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
		$("input#minType").val($("#slider2").slider("values",0));
		$("input#maxType").val($("#slider2").slider("values",1));
    },
    slide: function(event, ui){
		$("input#minType").val($("#slider2").slider("values",0));
		$("input#maxType").val($("#slider2").slider("values",1));
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

jQuery("input#minType").change(function(){
	var value1=jQuery("input#minType").val();
	var value2=jQuery("input#maxType").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minType").val(value1);
	}
	jQuery("#slider2").slider("values",0,value1);	
});

	
jQuery("input#maxType").change(function(){
	var value1=jQuery("input#minType").val();
	var value2=jQuery("input#maxType").val();
	
	if (value2 > 1000) { value2 = 1000; jQuery("input#maxType").val(1000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxType").val(value2);
	}
	jQuery("#slider2").slider("values",1,value2);
});



$(function(){
   $('.sort-block-r ul li').click(function(){
        $('.sort-block-r ul li').removeClass('current');
        $(this).addClass('current'); 
   }); 
});

$(function(){
    $('.sort-block .sort-item').click().toggle(
        function(){
            $('.sort-block .sort-item').removeClass('sort-up');
            $('.sort-block .sort-item').removeClass('sort-down');
            $(this).removeClass('sort-down');
            $(this).addClass('sort-up');
        },
        function(){
            $('.sort-block .sort-item').removeClass('sort-up');
            $('.sort-block .sort-item').removeClass('sort-down');
            $(this).removeClass('sort-up');
            $(this).addClass('sort-down');
        }
      );
});

$(document).ready(function(){
   $('.objects-list .col1 .icheckbox').removeClass('checked'); 
});

$(function(){
    $('.objects-list .col1 .iCheck-helper').click().toggle(
     function(){
        $('.objects-list .col1 .icheckbox').addClass('checked'); 
        $('.objects-list table tbody .icheckbox').addClass('checked');
     },
        function(){
        $('.objects-list .col1 .icheckbox').removeClass('checked');
        $('.objects-list table tbody .icheckbox').removeClass('checked');
     }
    );
});

/* gems */
$(document).ready(function(){
/*$('.stones ul').bxSlider({
		pager: false,
		speed: 700
	});*/
$('.stones ul li img').css('visibility','visible');    
});
$(function(){
   $('.gems .stones li').click(function(){
      $('.gems .stones li').removeClass('active');
       $(this).addClass('active');
   }); 
});

$(function(){
   $('.gems .colors li').click(function(){
      $('.gems .colors li').removeClass('active');
       $(this).addClass('active');
   }); 
    
    $('.select-main-color .colors li').click(function(){
      $('.select-main-color .colors li').removeClass('active');
       $(this).addClass('active');
        $('.select-sub-color').slideDown();
        $('.select-main-color').slideUp();
   }); 
    
    $('.select-sub-color .sub-color').click(function(){
      $('.select-sub-color .sub-color').removeClass('active');
       $(this).addClass('active');
   });
    
    $('.select-sub-color .change').click(function(){
        $('.select-sub-color').slideUp();
        $('.select-main-color').slideDown();
    });
    
    $('.select-sub-color .set-color').click(function(){
        $('.select-sub-color').css('display','none');
        $('.select-main-color').css('display','block');
        $.fancybox.close();
    });
});

$(function(){
   $('.gems .forms li').click(function(){
      $('.gems .forms li').removeClass('active');
       $(this).addClass('active');
   }); 
});

$('.size-tabs').tabs();
$('.price-tabs').tabs({
    selected: 0
});

jQuery("#size-slider").slider({
	min: 0,
	max: 20,
    step: 0.1,
	values: [5,15],
	range: true,
	stop: function(event, ui) {
		jQuery("input#minSize").val(jQuery("#size-slider").slider("values",0));
		jQuery("input#maxSize").val(jQuery("#size-slider").slider("values",1));
    },
    slide: function(event, ui){
		jQuery("input#minSize").val(jQuery("#size-slider").slider("values",0));
		jQuery("input#maxSize").val(jQuery("#size-slider").slider("values",1));
    }
});
$("#price-slider").slider({
	min: 0,
	max: 100000,
    step: 1,
	values: [100,100000],
	range: true,
	stop: function(event, ui) {
		$("input#minPrice").val($("#price-slider").slider("values",0));
		$("input#maxPrice").val($("#price-slider").slider("values",1));
    },
    slide: function(event, ui){
		$("input#minPrice").val($("#price-slider").slider("values",0));
		$("input#maxPrice").val($("#price-slider").slider("values",1));
    }
});

$("#price-slider2").slider({
	min: 0,
	max: 100000,
    step: 1,
	values: [1000,10000],
	range: true,
	stop: function(event, ui) {
		$("input#minPrice2").val($("#price-slider").slider("values",0));
		$("input#maxPrice2").val($("#price-slider").slider("values",1));
    },
    slide: function(event, ui){
		$("input#minPrice2").val($("#price-slider").slider("values",0));
		$("input#maxPrice2").val($("#price-slider").slider("values",1));
    }
});

jQuery("input#minSize").change(function(){
	var value1=jQuery("input#minSize").val();
	var value2=jQuery("input#maxSize").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minSize").val(value1);
	}
	jQuery("#size-slider").slider("values",0,value1);	
});

	
jQuery("input#maxSize").change(function(){
	var value1=jQuery("input#minSize").val();
	var value2=jQuery("input#maxSize").val();
	
	if (value2 > 1000) { value2 = 1000; jQuery("input#maxSize").val(1000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxSize").val(value2);
	}
	jQuery("#size-slider").slider("values",1,value2);
});

jQuery("#size-slider2").slider({
	min: 1,
	max: 20,
    step: 1,
	values: [1,20],
	range: true,
	stop: function(event, ui) {
		jQuery("input#minSize2").val(jQuery("#size-slider2").slider("values",0));
		jQuery("input#maxSize2").val(jQuery("#size-slider2").slider("values",1));
    },
    slide: function(event, ui){
		jQuery("input#minSize2").val(jQuery("#size-slider2").slider("values",0));
		jQuery("input#maxSize2").val(jQuery("#size-slider2").slider("values",1));
    }
});

jQuery("input#minSize2").change(function(){
	var value1=jQuery("input#minSize2").val();
	var value2=jQuery("input#maxSize2").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minSize2").val(value1);
	}
	jQuery("#size-slider2").slider("values",0,value1);	
});

	
jQuery("input#maxSize2").change(function(){
	var value1=jQuery("input#minSize2").val();
	var value2=jQuery("input#maxSize2").val();
	
	if (value2 > 1000) { value2 = 1000; jQuery("input#maxSize2").val(1000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxSize2").val(value2);
	}
	jQuery("#size-slider2").slider("values",1,value2);
});


jQuery("input#minPrice").change(function(){
	var value1=jQuery("input#minPrice").val();
	var value2=jQuery("input#maxPrice").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minPrice").val(value1);
	}
	jQuery("#price-slider").slider("values",0,value1);	
});

	
jQuery("input#maxPrice").change(function(){
	var value1=jQuery("input#minPrice").val();
	var value2=jQuery("input#maxPrice").val();
	
	if (value2 > 100000) { value2 = 100000; jQuery("input#maxPrice").val(100000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxPrice").val(value2);
	}
	jQuery("#price-slider").slider("values",1,value2);
});

jQuery("input#minPrice2").change(function(){
	var value1=jQuery("input#minPrice2").val();
	var value2=jQuery("input#maxPrice2").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minPrice2").val(value1);
	}
	jQuery("#price-slider2").slider("values",0,value1);	
});

	
jQuery("input#maxPrice2").change(function(){
	var value1=jQuery("input#minPrice2").val();
	var value2=jQuery("input#maxPrice2").val();
	
	if (value2 > 100000) { value2 = 100000; jQuery("input#maxPrice2").val(100000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxPrice2").val(value2);
	}
	jQuery("#price-slider2").slider("values",1,value2);
});

$(function(){
   $('.gems .size li').click(function(){
      $('.gems .size li').removeClass('active');
       $(this).addClass('active');
   }); 
    $('.gems .price li').click(function(){
      $('.gems .price li').removeClass('active');
       $(this).addClass('active');
   }); 
});

$(function(){
   $('.gems .trans li').click(function(){
      $('.gems .trans li').removeClass('active');
       $(this).addClass('active');
   }); 
   $('.gems .clean li').click(function(){
      $('.gems .clean li').removeClass('active');
       $(this).addClass('active');
   });
   $('.gems .ogranka li').click(function(){
      $('.gems .ogranka li').removeClass('active');
       $(this).addClass('active');
   }); 
});


$(function(){
    $('.share-window .nav .social').click(function(){
        $('.share-window .nav span').removeClass('active');
        $(this).addClass('active');
        $('.share-window .data-item').css('display','none');
        $('.data .social').css('display','block');
    });
    $('.share-window .nav .mail').click(function(){
        $('.share-window .nav span').removeClass('active');
        $(this).addClass('active');
        $('.share-window .data-item').css('display','none');
        $('.data .mail').css('display','block');
    });
    $('.share-window .nav .qr-code').click(function(){
        $('.share-window .nav span').removeClass('active');
        $(this).addClass('active');
        $('.share-window .data-item').css('display','none');
        $('.data .qr-code').css('display','block');
    });
    $('.share-window .nav .html').click(function(){
        $('.share-window .nav span').removeClass('active');
        $(this).addClass('active');
        $('.share-window .data-item').css('display','none');
        $('.data .html').css('display','block');
    });
});

$(".share").fancybox({
	'scrolling'		: 'no',
	'titleShow'		: false,
});
$(".share-btn a").fancybox({
	'scrolling'		: 'no',
	'titleShow'		: false,
});

$(document).ready(function(){
    $('.gems .stones .open-btn').click(function(){
        $('.big-btn .stone-list').slideToggle();
    })
});

$("body").click(function(e) {
	if($(e.target).closest(".objects-list table tr td .search").length==0) $(".objects-list table tr td .short-info").css("display","none");
if($(e.target).closest(".gems .stones .big-btn .open-btn").length==0) $(".gems .stones .big-btn .stone-list").css("display","none");  
    	if($(e.target).closest(".objects-list .gem-item").length==0) $(".objects-list .gem-item .short-info").css("display","none");
});

$(document).ready(function(){
    $('.objects-list table tr td .search').click(function(){
        $('.objects-list table tr td .short-info').css('display','none');
        $(this).next().slideDown();
    });
    $('.objects-list .gem-item .search').click(function(){
        $('.objects-list .gem-item .short-info').css('display','none');
        $(this).next().slideDown();
    });
});

$(document).ready(function(){
    $('.object-menu.top a.download').click(function(){
        $('.object-menu.top ul.submenu').slideToggle();
    });
     $('.object-menu.bottom a.download').click(function(){
        $('.object-menu.bottom ul.submenu').slideToggle();
    });
});

$('.order-edit-tabs').tabs();
$('.reg-tabs').tabs();

$(document).ready(function(){
    $('.objects-list .buttons .more').click(function(){
       $('.objects-list .buttons .more-list').slideToggle(); 
    });
});

$(document).ready(function(){
    $('.reg-tabs .add-req').click(function(){
        $(this).toggleClass('opened');
        $('.reg-tabs .req').slideToggle();
    });
});

$(document).ready(function(){
    $('#publish-window .more-info').click(function(){
        $(this).css('display','none');
        $('#publish-window .short-info').css('display','none');
        $('#publish-window .order-edit-tabs').css('display','block');
    });
    $('#publish-window .less-info-btn').click(function(){
        $(this).css('display','none');
	   $('#publish-window .more-info').css('display','inline-block');
        $('#publish-window .short-info').css('display','block');
        $('#publish-window .order-edit-tabs').css('display','none');
    });
    $('.publish-link').click(function(){
        $('.more-info').css('display','inline-block');
		$('.more-info-btn').css('display','inline-block');
        $('.short-info').css('display','block');
        $('.order-edit-tabs').css('display','none');
    });
    $('.loading-item .more-info').click(function(){
        $(this).css('display','none');
        $('.loading-item .edit-object-tab').css('display','none');
        $('.loading-item .order-edit-tabs').css('display','block');
        $('.loading-item #common-info').css('display','block');
    });
});

$(document).ready(function(){
    $('.publish-color-stone .more-info-btn').click(function(){
        $(this).css('display','none');
		$('.publish-color-stone .less-info-btn').css('display','inline-block');
        $('.publish-color-stone .short-info').css('display','none');
        $('.publish-color-stone .order-edit-tabs').css('display','block');
    });
	$('.publish-color-stone .less-info-btn').click(function(){
        $(this).css('display','none');
		$('.publish-color-stone .more-info-btn').css('display','inline-block');
      $('.publish-color-stone .more-info').css('display','inline-block');
        $('.publish-color-stone .short-info').css('display','block');
        $('.publish-color-stone .order-edit-tabs').css('display','none');
    });
});

$(document).ready(function(){
    $('.contact-info button.edit').click(function(){
        $('#contact-info').css('display','none');
        $('#edit-contact-info').css('display','block');
    });
    $('.my-contact .add-contact').click(function(){
        $('#edit-contact-info').css('display','none');
        $('#add-contact-info').css('display','block');
    });
});

$(document).ready(function(){
    $('.open-conf').click(function(){
        $('.sect-menu.policy li').removeClass('active');
        $(this).parent().addClass('active');
        $('#policy').css('display','none');
        $('#confidence').css('display','block');
    });
    $('.open-pol').click(function(){
        $('.sect-menu.policy li').removeClass('active');
        $(this).parent().addClass('active');
        $('#confidence').css('display','none');
        $('#policy').css('display','block');
    });
});

$(function(){
	$('.fancy_img').fancybox({ padding: 0 });
    $('.fancy_drag').fancybox({ padding: 0 });
    $('.fancy_raw').fancybox({ padding: 0 });
    $('.fancy_izd').fancybox({ padding: 0 });
	
	/*$('.gal-tabs .carousel ul').bxSlider({
		pager: false,
		speed: 700,
        infiniteLoop: true
	});*/
    $(".carousel-steps").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
        visible: 1
    });
    
    $(".gallery .carousel").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
        visible: 3
    });
    
    $(".gal-tabs .carousel").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
        visible: 5,
        circular: false,
        start: 0,
        scroll: 1
    });
    
    $(".stones .carousel").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
        visible: 8
    });
    
    $(".color-selected .carousel").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
        visible: 1,
        circular: false
    });
});


$(document).ready(function(){
    $('.jewelry-list select').selectBox();
});

$(document).ready(function(){
    $('#login-form input').iCheck();
});

$(document).ready(function(){
    $('select').selectBox();
    $('input').iCheck();
    $("input.nice").nicefileinput({
	label : 'Выбрать'
});
    $('input[type="file"]').css('visibility','visible');
});

$('.jewelry-list input').iCheck();

$(document).ready(function(){
    $('.my-contact .add-contact').click(function(){
        $('#contact-info').css('display','none');
        $('#edit-contact-info').css('display','none');
        $('#add-contact-info').css('display','block');
    });
    $('.my-contact .contacts li').click(function(){
        $('.my-contact .contacts li').removeClass('active');
        $(this).addClass('active');
        $('#edit-contact-info').css('display','none');
        $('#add-contact-info').css('display','none');
        $('#contact-info').css('display','block');
    });
    $('#contact-info button.edit').click(function(){
        $('#add-contact-info').css('display','none');
        $('#contact-info').css('display','none');
        $('#edit-contact-info').css('display','block');
    });
});

$(function() {
    var availableTags = [
      "Елена Михайлова",
      "Красавина Марина",
      "Игорь Владимирович",
    ];
    $( ".client-input" ).autocomplete({
      source: availableTags
    });
  });

$(document).ready(function(){
	$('.add-new-stone').click(function(){
		$('.add-new-stone-form').slideDown();
	});
	$('.remove-add-stone-form').click(function(){
		$('.add-new-stone-form').slideUp();
	});
});

$(document).ready(function(){
	$('.select-trans').click(function(){
		$('.trans-list').slideDown();
	});
	$('.select-clear').click(function(){
		$('.clear-list').slideDown();
	});
	
	$('.trans-list li').click(function(){
		var txt = $(this).children('span').text();
		$('.select-trans').val(txt);
	});
	$('.clear-list li').click(function(){
		var txt = $(this).children('span').text();
		$('.select-clear').val(txt);
	});
});

$("body").click(function(e) {
	if($(e.target).closest(".select-trans").length==0) $(".trans-list").css("display","none");
	if($(e.target).closest(".select-clear").length==0) $(".clear-list").css("display","none");
});
