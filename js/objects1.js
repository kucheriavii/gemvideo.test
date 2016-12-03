


(function () {
    'use strict';
    GV.Objects1 = {
        list:null,
        $list:$('.j-objects1__list'),
        $filter: $('.j-objects1__filter_def'),
        $formClass:".j-objects1__filter_def",
        params: [],
        itemTpl:null,
        pageNumber:0,
        pageSizeArray:[15,10,10,5],
        pageSize:0,
        isDifferent:false,
        sortOrder:null,
        tmplNumber:null,// Номер выбранного оторбражения
        init: function() {
            console.log("was init");
            var self = this;
            self.list = $.parseJSON($(".j-objects1__data").html());
            self.itemTpl = _.template($(".j-objects1__item_tpl1").html());
            self.bindEvents();
            self.renderList(self.list);
            self.initUI();
           // self.initColors();
            self.tmplNumber =1;
        },
        renderList:function(list) { // Выбор отображений
            self = this;
            var temp ='';
            var keyArr = ["id", "date_created", "stone_type", "price_rub", "price_carat_rub", "notes", "weight","field", "authenticityLab",
                          "authenticity_cert","authenticity_date", "cut_design", "color", "clarity", "cut_type", "polishing", "symmetry",
                          "fluorescence", "girdle", "culet_size"];
            if (list.length <= 0) {
                $("#nextObjects button").attr("disabled", true);
            } else {$("#nextObjects button").attr("disabled", false);
                    $("#prevObjects button").attr("disabled", false);}
            if(self.tmplNumber==4)
            {
                var l={"objects":list.slice(0,5)};
                var self= this;
                temp += self.itemTpl(l);
                self.$list.html(temp);
                if(list.length>1) {
                    if (self.isDifferent) {
                        for (var k in keyArr) {
                            var key = keyArr[k];
                            var isEqual = true;
                            for (var i =0; i < list.length-1 && i < 4; i++) {
                                if(list[i][key]  == null||list[i][key]  == ''||list[i][key]=='0'||list[i][key]==0)
                                    list[i][key]='';
                                if(list[i+1][key]== null||list[i+1][key]== ''||list[i+1][key]=='0' ||list[i+1][key]==0)
                                    list[i+1][key]='';
                                console.log(list[i][key] == list[i+1][key]);
                                console.log(list[i+1][key]);
                                if (list[i][key] != list[i+1][key]) {
                                    isEqual = false;
                                    break;
                                }
                            }
                            if (isEqual) {
                                $("#tmpl4_"+key).hide();
                            }

                        }
                        $("#getDifferent").attr("checked", "checked");
                    } else {$("#unsetDifferent").attr("checked", "checked");}

                }

            } else {
                _.each(list, function(item){
                    temp += self.itemTpl(item);
                });
                self.$list.html(temp);
            }
        },
        filter: function(){
            var self = this,
                params = $.parseParams(self.$filter.serialize()),
                query = [];
            console.log(JSON.stringify(params));
            _.each(params, function(val, param){
                if (val != '' && val != null) {
                    if ((param == 'cost_min' && val == '0') || (param == 'cost_max' && val == '100000')
                        ||(param == "price_max" && val == 100000) || (param == "calibrated_size_max" && val == 20)
                        || (param == 'max_price_per_carat' && val == 10000) || (param == 'carat_max' && val == '20')||(val == 0)) {
                        delete params[param];
                    } else {

                        query.push(param + '=' + val);
                    }
                }
            });
            query.pop();
            //console.log(JSON.stringify(query));
            window.history.replaceState(null, null, 'client/objects1' + ((query.length)?'?':'') + query.join('&'));
            self.getList(params, function(result){
                self.renderList(result.objects1);
                $("#findObjectsCount").text(result.objects1.length);
               // $('.j-orders__count').text(result.orders_count);
            });
        },
        getList: function(params, callback){
            $.ajax({
                url: 'client/objects1',
                method: 'get',
                data: params,
                success: function(result){
                    callback(result);
                },
                error: function(result){
                    console.log('error', result);
                }
            });
        },

        initUI: function(){
            var self = this;
            $('.j-objects1__slider').each(function(){
                var $slider = $(this),
                    data = $slider.data();
                $(this).slider({
                    min: data.min,
                    max: data.max,
                    step: data.step,
                    values: [data.min, data.max],
                    range: true,
                    stop: function(event, ui) {
                        //console.log(ui);
                        $('.' + data.minField).val(ui.values[0]);
                        $('.' + data.maxField).val(ui.values[1]);
                        self.filter();
                    },
                    slide: function(event, ui){
                        $('.' + data.minField).val(ui.values[0]);
                        $('.' + data.maxField).val(ui.values[1]);
                    }
                });
                $('.' + data.minField).on('change', function(){
                    var minValue = parseFloat($(this).val().replace(/\s*/g,'').replace(/,/g,'.')) || $(this).data('default');
                    $(this).val(minValue);
                    $slider.slider().slider('values', 0, minValue);
                });
                $('.' + data.maxField).on('change', function(){
                    var maxValue = parseFloat($(this).val().replace(/\s*/g,'').replace(/,/g,'.')) || $(this).data('default');
                    $(this).val(maxValue);
                    $slider.slider().slider('values', 1, maxValue);
                });
            });
        },
        bindEvents:function(){
            var self = this;
        $(".j-objects1__filter .carousel li").on("click", function(){
            $("input[name=stone_type]").val($(this).data("id"));
            self.colorPalette();
            self.changeFilter($(this).data("id"));
        });
        $(".j-objects1__filter .stones .stone-list span").on("click", function(){
            $(".j-objects1__filter .carousel li[data-id='" + $(this).data("typeid") + "']").trigger("click");
            $('li[data-id="' + $(this).data('typeid') + '"] a[href="#'+$(this).data("href")+'"]').trigger("click");//("click");
         });
        $(".j-objects1 .forms li").on("click", function(){
            $(self.$formClass+" input[name=cut_design]").val($(this).index()+1);
            self.filter();
            //alert($("input[name=cut_design]").val());
        });

        $(".j-objects1 .color-var li").on("click", function(){
            $(self.$formClass +" input[name=color_variaton]").val($(this).index()+1);
            self.filter();
            //alert($("input[name=cut_design]").val());
        });
        $("body").on("click", ".j-palette__base_color", function(){
            $(".j-palette__base_color").removeClass("active");
            $(this).addClass("active");
            $(self.$formClass +" input[name=color]").val($(this).data("id"));
            self.filter();
        });
        $("body").on("click", ".j-palette__addit_color", function(){
            $(self.$formClass +" input[name=subcolor]").val($(this).data("id"));
            self.filter();
        });
        $("body").on("click", ".transparent_stone", function(){
            $(".j-palette__base_color").removeClass("active");
            $(this).addClass("active");
                    self.subColorPalette($(this).data("id"));
        });

        $(".j-objects1 .arrowchooser li").on("click", function(){
            $(self.$formClass +" input[name=aa_clean]").val($(this).index()+1);
            $('.arrowchooser li').removeClass('active');
            $(this).addClass('active');

            self.filter();
            
            //alert($("input[name=cut_design]").val());
        });
        
        $('.j-objects1 .trans li').on("click", function(){
            $(self.$formClass +" input[name=transparency]").val($(this).index()+1);
            self.filter();
        });
        $('.j-objects1 .clean li').on("click", function(){
            $(self.$formClass +" input[name=clarity]").val($(this).index()+1);
            self.filter();
        });
        $('.j-objects1 .ogranka li').on("click", function(){
            $(self.$formClass +" input[name=cut_type]").val($(this).index()+1);
            self.filter();
        });
        $("#size3 input").on("focusout", function(){
            self.filter();
        });
        $("select ").on("change", function () {
            self.filter();
        });
        $('.checkboxes').on('ifChecked', function(event){
            self.filter();
        });
        $('.checkboxes').on('ifUnchecked', function(event){
            console.log("Unhz");
            self.filter();
        });
        $('input[type=checkbox]').on('change', function(){
            console.log("check");
        });
        $('.j-objects1__toggle_filter').on('click', function(){
            var name = 'filter-' + $(this).data('name');
            $.cookie(name, ($.cookie(name) == 'open') ?  null : 'open', { expires: 365, path: 'default.htm' });
            $('.filter-body').slideToggle().toggleClass('closed').toggleClass('opened');
            $(this).toggleClass('hide-filter').toggleClass('open-filter').find('span').toggle();
            return false;
        });
        $('.j-objects1__reset_filter').on('click', function(){
            $('.j-objects1__filter').find('input:text').each(function(){
                var defaultValue = $(this).data('default');
                if (defaultValue == 'undefined') defaultValue = '';
                $(this).val(defaultValue).trigger('change');
            });
            $("input[name=stone_type]").val('');
            $(".carousel li").removeClass("active");
            $("input[name=cut_design]").val('');
            $(".j-objects1 .forms li").removeClass('active');
            $('.j-objects1__filter').find('select').not(':disabled').val('').selectBox('refresh');
            self.filter();
            return false;
        });
        $(".sort-block-l .sort-item").click(function(){

            self.sortOrder = 4;
            if ($(this).hasClass("sort-up")){
                $(".sort-block-l .sort-item").removeClass("sort-up");
                $(this).toggleClass("sort-down");
                self.sortOrder = 3;
            }else if($(this).hasClass("sort-down")){
                $(".sort-block-l .sort-item").removeClass("sort-down");
                $(this).toggleClass("sort-up");
                self.sortOrder = 4;
            }else{
                $(".sort-block-l .sort-item").removeClass("sort-down");
                $(".sort-block-l .sort-item").removeClass("sort-up");
                $(this).toggleClass("sort-up");
                self.sortOrder = 4;
            }
            $("input[name=sort]").val($(this).data("sort"));
            $("input[name=order]").val(self.sortOrder);
            console.log($("input[name=sort]").val()+"---"+ $("input[name=order]").val());
            self.filter();
        });

        $(".sort-block-r li").on("click", function(){//-------------------------
            var index = $(this).index()+1;
            self.pageNumber=0;
            self.tmplNumber = index;
            self.pageSize = self.pageSizeArray[index - 1];
            self.itemTpl = _.template($(".j-objects1__item_tpl"+index).html());
            $("input[name=limit]").val(self.pageSizeArray[index - 1]);
			if(index >1)
			$(".aa_forms thead").hide();
			else{$(".aa_forms thead").show();}
            self.filter();
        });
        // next prev page for fourth view
        $("#prevObjects").click(function(){
            if(self.pageNumber <= 0) {
                $("#prevObjects button").attr("disabled", true);
                $("#nextObjects button").attr("disabled", false);
            } else {
                $("#prevObjects button").attr("disabled", false);
                self.pageNumber--;
                $("input[name=offset]").val(self.pageNumber*self.pageSizeArray[self.tmplNumber - 1]);
                self.filter();
            }
        });
        $("#nextObjects").click(function(){
            self.pageNumber++;
            $("#prevObjects button").attr("disabled", false);
            $("input[name=offset]").val(self.pageNumber*self.pageSizeArray[self.tmplNumber - 1]);
            self.filter();
        });
        $(document).on("click", "#getDifferent", function() {
           console.log("was clicked");
            if($(this).is(':checked')) {
                self.isDifferent = true;
                self.filter();
            }
        });
        $(document).on("click", "#unsetDifferent", function() {
            console.log("was clicked unsetDifferent");
            if($(this).is(':checked')) {
                self.isDifferent = false;
                self.filter();
            }
        });
        $(".share-btn").click(function(){
            var str = "";
            var links ="";
            var href = "../segoma.com/v.php@type=view&id=";

            $(".checkboxesTpl input:checked").each(function(){
                str +="<a href="+href+$(this).data("id")+" />"+href+$(this).data("id")+"</a></br></br>";
                links +=" "+$(this).data("id");
            });
            $("input[name='Share[links]']").val(links);
            $("#mailLinks").empty();
            $("#mailLinks").append(str);
        });
        },
        changeColor: function(data){
         var self = this;
            var colors ='';
           var  tpl =  _.template($(".j-objects1__stonecolor_tpl1").html());
            _.each(data, function(item){
                colors+= tpl(item);
            });
            $(".color-selected").html(colors);
         },
        colorPalette:function(){
            var self = this;
            var stoneId = $("input[name=stone_type]").val();
            if(!stoneId) {
                toastr.error("выберите тип капня");
                return false;
            }
            var  data = {stone_id:stoneId};
            console.log(data);
            $.ajax({
                type: "GET",
                url:'color/stone-palette',
                data: data,
                success: function(data){
                    self.changeColor(data);
                    //console.log(data);
                   // toastr.success(data);
                },
                dataType: "json"
            });
        },
        subColorPalette:function(parent_id){
            var self = this;
            //var parent_id = $("input[name=stone_type]").val();
            console.log(parent_id);
            $.ajax({
                type: "GET",
                url:'color/subcolors@id='+parent_id,
                // data: data,
                success: function(data){
                    self.showSubcolor(data.colors);
                    console.log(data);
                    // toastr.success(data);
                },
                dataType: "json"
            });
        },
        showSubcolor:function(subcolorArray){
            var self = this;
            var colors ='';
            var  tpl =  _.template($(".j-objects1__subcolor_tpl").html());
            _.each(subcolorArray, function(item){
                colors+= tpl(item);
            });
            $(".col_subcolor").html(colors);
        },
         changeFilter: function(id) {
             var self = this;
             if (id == 7) {
                 self.$filter = $(".j-objects1__filter_nocol");
                 self.$formClass = ".j-objects1__filter_nocol";
             } else if (id == 6) {
                 self.$filter = $(".j-objects1__filter_col");
                 self.$formClass = ".j-objects1__filter_col";
             } else {
                 self.$filter = $(".j-objects1__filter_def");
                 self.$formClass = ".j-objects1__filter_def";
             }
             self.filter();
         },

    };
    if($(".j-objects1").length){
        GV.Objects1.init();
    }
})();


$(function() {
	$( '#dl-menu' ).dlmenu({
		animationClasses : { classin : 'dl-animate-in-3', classout : 'dl-animate-out-3' }
	});
});