jQuery(document).ready(function(){


/* слайдер цен */

jQuery("#slider2").slider({
	min: 0,
	max: 1000,
	values: [0,1000],
	range: true,
	stop: function(event, ui) {
		jQuery("input#minCost2").val(jQuery("#slider2").slider("values",0));
		jQuery("input#maxCost2").val(jQuery("#slider2").slider("values",1));
		
    },
    slide: function(event, ui){
		jQuery("input#minCost2").val(jQuery("#slider2").slider("values",0));
		jQuery("input#maxCost2").val(jQuery("#slider2").slider("values",1));
    }
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



/* слайдер цен */

jQuery("#slider").slider({
	min: 0,
	max: 1000,
	values: [0,1000],
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



/* слайдер карата */

jQuery("#CaratSlider").slider({
	min: 0,
	max: 1000,
	values: [0,1000],
	range: true,
	stop: function(event, ui) {
		jQuery("input#minCaratSlider").val(jQuery("#CaratSlider").slider("values",0));
		jQuery("input#maxCaratSlider").val(jQuery("#CaratSlider").slider("values",1));
		
    },
    slide: function(event, ui){
		jQuery("input#minCaratSlider").val(jQuery("#CaratSlider").slider("values",0));
		jQuery("input#maxCaratSlider").val(jQuery("#CaratSlider").slider("values",1));
    }
});

jQuery("input#minCaratSlider").change(function(){

	var value1=jQuery("input#minCaratSlider").val();
	var value2=jQuery("input#maxCaratSlider").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minCaratSlider").val(value1);
	}
	jQuery("#CaratSlider").slider("values",0,value1);	
});

	
jQuery("input#maxCaratSlider").change(function(){
		
	var value1=jQuery("input#minCaratSlider").val();
	var value2=jQuery("input#maxCaratSlider").val();
	
	if (value2 > 1000) { value2 = 1000; jQuery("input#maxCaratSlider").val(1000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxCaratSlider").val(value2);
	}
	jQuery("#CaratSlider").slider("values",1,value2);
});

/* слайдер калибра */

jQuery("#CalibrSlider").slider({
	min: 0,
	max: 1000,
	values: [0,1000],
	range: true,
	stop: function(event, ui) {
		jQuery("input#minCalibrSlider").val(jQuery("#CalibrSlider").slider("values",0));
		jQuery("input#maxCalibrSlider").val(jQuery("#CalibrSlider").slider("values",1));
		
    },
    slide: function(event, ui){
		jQuery("input#minCalibrSlider").val(jQuery("#CalibrSlider").slider("values",0));
		jQuery("input#maxCalibrSlider").val(jQuery("#CalibrSlider").slider("values",1));
    }
});

jQuery("input#minCaratSlider").change(function(){

	var value1=jQuery("input#minCalibrSlider").val();
	var value2=jQuery("input#maxCalibrSlider").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minCalibrSlider").val(value1);
	}
	jQuery("#CalibrSlider").slider("values",0,value1);	
});

	
jQuery("input#maxCalibrSlider").change(function(){
		
	var value1=jQuery("input#minCalibrSlider").val();
	var value2=jQuery("input#maxCalibrSlider").val();
	
	if (value2 > 1000) { value2 = 1000; jQuery("input#maxCalibrSlider").val(1000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxCalibrSlider").val(value2);
	}
	jQuery("#CalibrSlider").slider("values",1,value2);
});

/* слайдер цена общая */

jQuery("#TotalPrice").slider({
	min: 0,
	max: 1000,
	values: [0,1000],
	range: true,
	stop: function(event, ui) {
		jQuery("input#minTotalPrice").val(jQuery("#TotalPrice").slider("values",0));
		jQuery("input#maxTotalPrice").val(jQuery("#TotalPrice").slider("values",1));
		
    },
    slide: function(event, ui){
		jQuery("input#minTotalPrice").val(jQuery("#TotalPrice").slider("values",0));
		jQuery("input#maxTotalPrice").val(jQuery("#TotalPrice").slider("values",1));
    }
});

jQuery("input#minTotalPrice").change(function(){

	var value1=jQuery("input#minTotalPrice").val();
	var value2=jQuery("input#maxTotalPrice").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minTotalPrice").val(value1);
	}
	jQuery("#TotalPrice").slider("values",0,value1);	
});

	
jQuery("input#maxTotalPrice").change(function(){
		
	var value1=jQuery("input#minTotalPrice").val();
	var value2=jQuery("input#maxTotalPrice").val();
	
	if (value2 > 1000) { value2 = 1000; jQuery("input#maxTotalPrice").val(1000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxTotalPrice").val(value2);
	}
	jQuery("#TotalPrice").slider("values",1,value2);
});


/* слайдер цена за камень */

jQuery("#PiecePrice").slider({
	min: 0,
	max: 1000,
	values: [0,1000],
	range: true,
	stop: function(event, ui) {
		jQuery("input#minPiecePrice").val(jQuery("#PiecePrice").slider("values",0));
		jQuery("input#maxPiecePrice").val(jQuery("#PiecePrice").slider("values",1));
		
    },
    slide: function(event, ui){
		jQuery("input#minPiecePrice").val(jQuery("#PiecePrice").slider("values",0));
		jQuery("input#maxPiecePrice").val(jQuery("#PiecePrice").slider("values",1));
    }
});

jQuery("input#minPiecePrice").change(function(){

	var value1=jQuery("input#minPiecePrice").val();
	var value2=jQuery("input#maxPiecePrice").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minPiecePrice").val(value1);
	}
	jQuery("#PiecePrice").slider("values",0,value1);	
});

	
jQuery("input#maxPiecePrice").change(function(){
		
	var value1=jQuery("input#minPiecePrice").val();
	var value2=jQuery("input#maxPiecePrice").val();
	
	if (value2 > 1000) { value2 = 1000; jQuery("input#maxPiecePrice").val(1000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxPiecePrice").val(value2);
	}
	jQuery("#PiecePrice").slider("values",1,value2);
});






// фильтрация ввода в поля
	jQuery('input').keypress(function(event){
		var key, keyChar;
		if(!event) var event = window.event;
		
		if (event.keyCode) key = event.keyCode;
		else if(event.which) key = event.which;
	
		if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
		keyChar=String.fromCharCode(key);
		
		if(!/\d/.test(keyChar))	return false;
	
	});


});



