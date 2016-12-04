(function () {
    'use strict';

    GV.Palette = {
        init: function(options){
            var self = this,
                options = options || {};
            self.$palette = $('.j-palette');
            self.$colorBox = options.colorBox;
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
            self.$palette.on('click', '.j-palette__base_color', function(){
                var id = $(this).data('id');
                $(this).addClass('active').siblings().removeClass('active');
                self.getSubcolors({id: id}, function(data){
                    var tpl = _.template($('.j-palette__addit_tpl').html());
                    $('.j-palette__base').hide();
                    $('.j-palette__addit').html(tpl(data)).show();
                });
                return false;
            });
            self.$palette.on('click', '.j-palette__change_base', function(){
                $('.j-palette__base').show();
                $('.j-palette__addit').hide();
            });
            self.$palette.on('click', '.j-palette__addit_color', function(){
                var data = $(this).data();
                $(this).addClass('active').siblings().removeClass('active');
                $('.j-palette__color_x').html(data.x + ' - ' + data.x_descr);
                $('.j-palette__color_y').html(data.y + ' - ' + data.y_descr);
                return false;
            });
            self.$palette.on('click', '.j-palette__set_color', function(){
                var data = {
                    color: $('.j-palette__base_color.active').data(),
                    subcolor: $('.j-palette__addit_color.active').data()
                };
                var $color = self.$colorBox,
                    tpl = _.template($color.siblings('.j-object_editor__color_tpl').html());
                $color.html(tpl(data));
                $('.fancybox-close').click();
                return false;
            });
        },
        getSubcolors: function(options, callback){
            var self = this;
            $.get('color/subcolors', {id: options.id}, function(data){
                callback(data);
            });
        }

    };
    if ($('.j-palette').length) {
        GV.Palette.init();
    }

})();