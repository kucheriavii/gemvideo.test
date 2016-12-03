(function () {
    'use strict';

    GV.AdminPalette = {
        currentStoneId:null,
        init: function(options){
            var self = this,
                options = options || {};
            self.$palette = $('body');
            self.bindEvents();
            self.initUI();
        },
        initUI: function(){
            var self = this;
        },
        refreshUI: function() {

        },
        bindEvents: function(){
            var self = this;

            $(".stoneSubcolor").click(function(){
                var url = 'color/admin-palette';
                self.currentStoneId = $(this).data("id");
                $.get(url,{stone_id:self.currentStoneId}, function(form){
                    self.showEditor(form);
                });

           });

            self.$palette.on('click', '.j-palette__base_color', function(){
                var id = $(this).data('id');
                $(this).toggleClass("active");
                return false;
            });
            self.$palette.on('click', '.j-palette__set_color', function(){
                var $ids = [];
                $(".j-palette__base_color.active").each(function(){
                    $ids.push($(this).data('id'));
                });

                var data = {stoneId:self.currentStoneId, checked: $ids};
                self.saveData(data);

                $('.fancybox-close').click();
                return false;
            });
        },
        showEditor: function  (form){
        var self = this;
        $.fancybox({
            content: form,
            afterShow: function() {
                self.$editor = $('.j-order_editor');
                self.initUI();
            }
        });
        },
        in_array:function($arr, $val)
        {
            for (var i=0; i<$arr.length; i++)
            {
                if($arr[i] == $val)
                return true;
            }
            return false;
        },
        saveData:function(data){
            $.ajax({
                type: "POST",
                url:'color/save-palette',
                data: data,
                success: function(data){
                    console.log(data);
                    toastr.success(data);
                },
                dataType: "json"
            });
        },
        checkedColor: function(options, callback){
            var self = this;
            $.get('color/subcolors', {id: options.id,stoneId:self.currentStoneId}, function(data){
                callback(data);
            });
        }

    };
    if ($('.adminEditColor').length) {
        GV.AdminPalette.init();
    }

})();