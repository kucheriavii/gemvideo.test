/**
 * Created by taipov on 06.11.2015.
 */
(function () {
    'use strict';
    GV.EditColoredStone = {
        init: function() {
            var self = this;
            console.log("was init edit colored");
            self.initColors();
            self.bindEvents();
        },
        initColors: function(){
            var self = this;
            $('.j-object_editor__color').not('.j-inited').each(function(){
                var $color = $(this),
                    tpl = _.template($color.siblings('.j-object_editor__color_tpl').html()),
                    data = $.parseJSON($color.siblings('.j-object_editor__color_data').html());
                $(this).addClass('j-inited').html(tpl(data));
            });
        },
        bindEvents: function(){
            var self = this;
            $(".coloredStoneEdit form").submit(function(){
                $("input[name='Object[color]']").val($("input[name=color]").val());
                $("input[name='Object[subcolor]']").val($("input[name=subcolor]").val());
                }
            );
/*            $("#object-price_rub, #object-price_carat_rub").click(function(){
                if($("#object-weight").val()=='') {
                    toastr.error('weight cannot be empty');
                } else {
                    $(this).attr("readonly",false);
                }
            });*/
            $("#object-price_rub").change(function(){
               if(self.isNumeric($(this).val())) {
                   var price = $(this).val()/$("#object-weight").val();
                   price = price.toFixed(2);
                   $("#object-price_carat_rub").val(price);
               } else{
                   toastr.error('Are you the 6 fingered man?');
               }
            });
            $("#object-price_carat_rub").change(function(){
                if(self.isNumeric($(this).val())) {
                    var price = $(this).val()*$("#object-weight").val();
                    price = price.toFixed(2);
                    $("#object-price_rub").val(price);
                } else{
                    toastr.error('Are you the 6 fingered man?');
                }
            });
            $(".delete-scheme").click(function(){
               var self = $(this);
               var id = self.data("id");
                console.log(id);
                $.ajax({
                    url: 'object/delete-scheme',
                    method: 'get',
                    data: {'id':id},
                    success: function(result){
                        self.parent().hide(200);
                        console.log('success');
                    },
                    error: function(result){
                        console.log('error', result);
                    }
                });
            });

        },
        isNumeric: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    };

    if($(".transparentStoneEdit, .coloredStoneEdit").length){
        GV.EditColoredStone.init();
    }
})();