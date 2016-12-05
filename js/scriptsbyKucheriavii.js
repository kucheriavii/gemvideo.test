$( document ).ready(function() {
  $(".add-gem").click(function(event) {
    event.preventDefault();
    $(".gem-light-box").css('display','block');
    $(".gem-modal-add").css('display','block');
    $('.main-gem-block').removeClass('hidden-gem');
  });
  
  $(".add-jaw").click(function(event) {
  	event.preventDefault();
  	$(".gem-light-box").css('display','block');
  	$(".jaw-modal-add").css('display','block');
    $('.main-gem-block').removeClass('hidden-gem');
  });
  

  $(".close-modal-gem").click(function(event) {
  	$(".gem-light-box").css('display','none');
    $(".gem-modal-add").css('display','none');
  	$(".jaw-modal-add").css('display','none');
    $('.left-param').addClass('hidden-gem');
    $('.right-param').addClass('hidden-gem');
    $(".modal-menu li").removeClass('selected');
  });

  $(".show-more-options").click(function(event) {
  	event.preventDefault();
  	$(".gem-modal-add .modal-menu").css('display', 'block');
  	//$(this).removeClass('show-more-options');
  	if ($(".modal-menu").hasClass('close-more-options')){
  		$(".modal-menu").removeClass('close-more-options');
  		$(this).text("Скрыть дополнительные параметры")
  	} else {
  		$(".modal-menu").addClass('close-more-options');
  		$(this).text("Заполнить больше информации")
  	}
  });

  //******************************************
  //choose
  //******************************************
  $('.modal-menu .main').click(function(event) {
  	$('.left-param').addClass('hidden-gem');
  	$('.right-param').addClass('hidden-gem');
  	$('.main-gem-block').removeClass('hidden-gem');
  	$(".modal-menu li").removeClass('selected');
  	$(this).addClass('selected');
  });
  $('.modal-menu .grade').click(function(event) {
  	$('.left-param').addClass('hidden-gem');
  	$('.right-param').addClass('hidden-gem');
  	$('.grade-gem-block').removeClass('hidden-gem');
  	$(".modal-menu li").removeClass('selected');
  	$(this).addClass('selected');
  });
  $('.modal-menu .polir').click(function(event) {
  	$('.left-param').addClass('hidden-gem');
  	$('.right-param').addClass('hidden-gem');
  	$('.polish-gem-block').removeClass('hidden-gem');
  	$(".modal-menu li").removeClass('selected');
  	$(this).addClass('selected');
  });
  $('.modal-menu .real').click(function(event) {
  	$('.left-param').addClass('hidden-gem');
  	$('.right-param').addClass('hidden-gem');
  	$('.real-gem-block').removeClass('hidden-gem');
  	$(".modal-menu li").removeClass('selected');
  	$(this).addClass('selected');
  });
});