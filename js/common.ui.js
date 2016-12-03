(function () {
    'use strict';

    // Gallery preview
    $('.j-gallery_preview').each(function(){
        var galleryData = $(this).data();
        $(this).jCarouselLite(galleryData);
    });
    $('.j-gallery_preview__photo').fancybox({
        padding: 0
    });

    // Gallery
    GV.Gallery = {
        $gallery: $('.j-gallery'),
        $content: $('.j-gallery__content'),
        $previews: $('.j-gallery__previews'),
        init: function(){
            this.bindEvents();
        },
        bindEvents: function(){
            var self = this;
            self.$previews.on('click', 'li', function(){
                var id = $(this).data('id');
                self.getMedia(id);
                $(this).addClass('active').siblings().removeClass('active');
                return false;
            });
            self.$gallery.on('click', '.j-gallery__next', function(){
                var $next = self.$previews.find('li.active').first().next('li');
                if (!$next.length) {
                    $next = self.$previews.find('li').first();
                }
                $next.click();
                return false;
            });
            self.$gallery.on('click', '.j-gallery__prev', function(){
                var $next = self.$previews.find('li.active').first().prev('li');
                if (!$next.length) {
                    $next = self.$previews.find('li').last();
                }
                $next.click();
                return false;
            });
        },
        getMedia: function(id){
            var self = this;
            $.get('gallery/media@id=' + id, function(media){
                self.$content.html(media.content + '<span>' + media.descr + '</span>');
            });
        }
    };

    if ($('.j-gallery').length) {
        GV.Gallery.init();
    }

    // FAQ
    $('.j-faq__toggler').on('click', function(){
        var $item = $(this).parents('.j-faq');
        $item.siblings('.j-faq').find('.j-faq__toggler').removeClass('active');
        $item.siblings('.j-faq').find('.j-faq__answer').slideUp();
        $item.find('.j-faq__answer').slideToggle();
        $item.find('.j-faq__toggler').toggleClass('active');
    });

    // Forms
    $('select').selectBox();
    $(':checkbox').iCheck();
    $('.j-nav_tabs').tabs();

    // Video

    $('.j-video').on('click', function(){
        var videoId = $(this).data('id');
        $.fancybox({
            content: '<iframe width="853" height="480" src="../https@www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>',
        });
        return false;
    });


})();