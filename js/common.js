(function () {
    'use strict';

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    if (typeof window.GV == 'undefined' || !window.GV) {
        window.GV = {};
    }

    GV.EventBus = $('<div>');

    GV.Utils = {
        blockUI: function(){
            GV.EventBus.trigger('blockUI');
            $('body').addClass('wait');
        },
        unblockUI: function(){
            GV.EventBus.trigger('unblockUI');
            $('body').removeClass('wait');
        },
        getJson: function(elClass){
            var $el = $(elClass),
                data = {};
            if ($el.length) {
                data = $.parseJSON($el.html().trim() || '{}')
            }
            return data;
        }
    };

    $('.j-open_support').on('click', function(){
        jivo_api.open();
        return false;
    })

    GV.Glossary = {
        init: function(){
            var self = this;
            self.tpl = _.template($('.j-glossary__tpl').html());
            self.bindEvents();
        },
        bindEvents: function(){
            var self = this;
            $('.j-glossary__term').on('click', function(){
                var termId = $(this).data('id'),
                    $parent = $(this).parents('.j-glossary__key'),
                    $place = $parent.is('.j-glossary__key-place') ? $parent : $parent.nextAll('.j-glossary__key-place').first();

                console.log($parent.length);
                $('.j-glossary__term').removeClass('active');
                $(this).addClass('active');
                self.getInfo(termId, function(view){
                    $('.j-glossary__descr').remove();
                    $place.after(view);
                })
            });
        },
        getInfo: function(id, callback){
            var self = this;
            $.get('glossary/view', {id: id}, function(data){
                var view = self.tpl(data);
                callback(view);
            });
        }
    };
    if ($('.j-glossary').length) {
        GV.Glossary.init();
    }
	
	GV.Gallery = {
		init:function(){
			$(".carousel.j-gallery_preview iframe").attr("width","161").attr("height","159");
		}
	}
    if ($('.j-gallery_preview').length) {
		console.log("init");
        GV.Gallery.init();
    }

})();