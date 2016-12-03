(function () {
    'use strict';


    GV.Obj = {
        init: function(params){
            var self = this;

            self.bindEvents();
            if (!params.isShort) {
                self.$editor = $('.j-object_editor');
                self.initUI();
            }
            self.initColors();
        },
        initUI: function(){
            var self = this;
            self.$editor.find('select').selectBox();
            self.$editor.find('input[type=file].nice').nicefileinput({
                label : 'Выбрать'
            });
            self.$editor.find('.j-object_editor__tabs').tabs();
            self.$editor.find('.j-datepick').datepick({dateFormat: 'dd.mm.yyyy'});
            self.$editor.find(':checkbox').iCheck();
            $('#object-authenticity_lab').trigger('change');
            $('#uploader-object_authenticity_cert_file').on('complete', function(){
                $('.j-open_cert').hide();
            });
        },
        bindEvents: function(){
            var self = this;
            $(" .j-object_editor_full ").on('click',"#object-price_rub,#object-price_carat_rub",function(){
                if($("#object-weight").val()=='') {
                    $(this).attr("readonly",true);
                    toastr.error('weight cannot be empty');
                } else {
                    $(this).attr("readonly",false);
                }
            });
            $(".j-object_editor_full").on('change',"#object-price_rub", function(){
                if(self.isNumeric($(this).val())) {
                    var price = $(this).val()/$("#object-weight").val();
                    price = price.toFixed(2);
                    $("#object-price_carat_rub").val(price);
                } else{
                    toastr.error('Are you the 6 fingered man?');
                }
            });
            $(".j-object_editor_full").on('change',"#object-price_carat_rub", function(){
                if(self.isNumeric($(this).val())) {
                    var price = $(this).val()*$("#object-weight").val();
                    price = price.toFixed(2);
                    $("#object-price_rub").val(price);
                } else{
                    toastr.error('Are you the 6 fingered man?');
                }
            });
            $(document).on("click", ".delete-scheme", function(){
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
            // $(document).on('change',"#object-weight", function(){
            $(".j-object_editor_full").on('change',"#object-weight", function(){
                if(self.isNumeric($(this).val())) {
                    var price = $("#object-price_rub").val()/$(this).val();
                    price = price.toFixed(2);
                    $("#object-price_carat_rub").val(price);
                } else{
                    toastr.error('Are you the 6 fingered man?');
                }
            });




            $(document).on('click', '.j-create_object, .j-update_object', function(){
                GV.Utils.blockUI();
                var data = $(this).data();
                self.getEditor({
                    data: data,
                    callback: function(form) {
                        self.showEditor(form);
                        GV.Utils.unblockUI();
                    }
                });
                return false;
            });
            $(document).on('click', '.j-object_editor__toggle', function(){
                self.$editor.find('.ui-tabs-anchor').first().click();
                self.$editor.find('.j-object_editor__tabs').toggleClass('object-edit-page_short');
                $(this).find('span').toggle();
                return false;
            });
          /*  $(document).on('change', '[name="Object[currency]"]', function(){
                var currency = $(this).val(),
                    isUsd = currency == 'USD';
                $('[name="Object[currency]"]').val(currency).selectBox('refresh');
                $('[name="Object[price_rub]"], [name="Object[price_carat_rub]"]').toggleClass('f-hidden', isUsd);
                $('[name="Object[price_usd]"], [name="Object[price_carat_usd]"]').toggleClass('f-hidden', !isUsd);
            });*/
            $(document).on('change', '[name="Object[category]"], [name="Object[type]"]', function(e){
                var category = $('[name="Object[category]"]').val(),
                    type = $('[name="Object[type]"]').val();

                if (category == 1) {
                    var typeEl = _.find(object_types['object_stone_type'], function(el){ return el.value == type });
                    if (typeEl && typeEl.param1 == 'бесцветный') {
                        category = 2;
                    }
                }
                if (e.currentTarget.name == 'Object[category]') {
                    type = 0;
                }

                var data = {
                    'Object[id]' :  $('[name="Object[id]"]').val(),
                    'Object[category]' :  category,
                    'Object[type]' :  type,
                    '_csrf' : $('[name="_csrf"]').val()
                };

                self.save(data, function(){
                    if ($('.j-object_editor_full').length) {
                        window.location.reload();
                    } else {
                        $('.fancybox-close').click();
                        self.getEditor({
                            data: {id: data['Object[id]']},
                            callback: function(form) {
                                self.showEditor(form);
                            }
                        });
                    }
                }, function(){});
            });
            $(document).on('submit', '.j-object_editor__form', function(){
                self.$editor.find('.b-error-text').remove();
                self.$editor.find('.b-error').removeClass('b-error');
                var data = $(this).serializeObject();
                //data['Object[currency]'] = data['Object[currency]'][0];
                self.save(data, function(){
                    if ($('.j-object_editor_full').length) {
                        window.location.reload();
                    } else {
                        $('.fancybox-close').click();
                    }
                }, function(result){
                    self.showErrors(result.errors);
                });
                return false;
            });
            $(document).on('click', '.j-object_editor__cansel', function(){
                $('.fancybox-close').click();
                if ($('.j-object_editor_full').length) {
                    window.location = 'lab/objects';
                }
                return false;
            });
            $(document).on('click', '.j-object_editor__add_child', function(){
                var data = $(this).data();
                data.key = $('.j-object_editor__remove_child').length;
                self.getEditor({
                    data: data,
                    callback: function(form) {
                        $('.j-object_editor__childs').prepend(form);
                        $('.j-object_editor__childs').find('select').selectBox();
                        self.initColors();
                    }
                });
                return false;
            });
            $(document).on('click', '.j-object_editor__remove_child', function(){
                var $object = $(this).parent(),
                    objectId = $(this).data('id');
                $.post('object/delete@id=' + objectId, function(){
                    $object.remove();
                });
                return false;
            });
            $(document).on('change', '#object-authenticity_lab', function(){
                self.getLabsData();
                var labId = $(this).val(),
                    checkLink = self.labsData[labId];
                if (checkLink) {
                    checkLink = checkLink.replace('{id}', $('#object-authenticity_cert').val());
                    $('.j-check_online').show().attr('href', checkLink);
                    $('.j-upload_cert').hide();
                } else {
                    $('.j-check_online').hide();
                    $('.j-upload_cert').show();
                }
            });
            $(document).on('change keyup', '#object-authenticity_cert', function(){
                self.getLabsData();
                var certId = $(this).val().trim(),
                    labId = $('#object-authenticity_lab').val(),
                    checkLink = self.labsData[labId];
                if (checkLink) {
                    checkLink = checkLink.replace('{id}', certId);
                    $('.j-check_online').attr('href', checkLink);
                }
            });
            $(document).on('complete', '#uploader-object_authenticity_cert_file', function(){
                $('.j-open_cert').hide();
            });
            $(document).on('click', '.j-show_palette', function(){
                var $colorBox = $(this).parents('.j-object_editor__color');
                $.get('color/palette', function(html){
                    $.fancybox({
                        content: html,
                        afterShow: function() {
                            GV.Palette.init({colorBox: $colorBox});
                        }
                    });
                });
                return false;
            });
        },
        isNumeric: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        getLabsData: function(){
            this.labsData = GV.Utils.getJson('.j-authenticity_labs_data');
        },
        getEditor: function(options){
            $.get('object/update', options.data, function(form){
                if (typeof options.callback === 'function') {
                    options.callback(form);
                }
            });
        },
        showEditor: function(form){
            var self = this;
            $.fancybox({
                content: form,
                afterShow: function() {
                    self.$editor = $('.j-object_editor');
                    self.initUI();
                    self.initColors();
                }
            });
        },
        showErrors: function(errors) {
            var self = this;
            _.each(errors, function(error, field) {
                var name = field;
                if (name.indexOf('[') == -1) {
                    name = 'Object[' + field + ']';
                }
                self.$editor.find('[name="' + name + '"]').addClass('b-error')
                    .parent().append('<i class="b-error-text">' + error[0] + '</i>');
            });
            var parentId = self.$editor.find('.b-error').first().focus().parents('.ui-tabs-panel').first().attr('id');
            self.$editor.find('a[href="#' + parentId + '"]').click();
            $('html, body, .fancybox-overlay').animate({'scrollTop': self.$editor.find('.b-error').first().offset().top - 30})
        },
        save: function(data, callback, errorCallback) {
            var url = 'lab/object-update@id=' + data['Object[id]'];
            $.ajax({
                url: url,
                method: 'post',
                data: data,
                dataType: 'json',
                success: function(result){
                    if ($('.j-order__objects').length) {
                        $('.j-order__objects').html(result.objectsTable);
                    }
                    callback();
                },
                error: function(result){
                    errorCallback(result.responseJSON);
                }
            })
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
    };

    if (true) {
        var isShortObj = !$('.j-object_editor_full').length;
        GV.Obj.init({isShort: isShortObj});
    }

    GV.Objects = {
        list: null,
        url: 'lab/objects',
        $clients: $('.j-objects'),
        $list: $('.j-objects__list'),
        $filter: $('.j-objects__filter'),
        itemTpl: null,
        init: function(){
            var self = this;
            self.list = $.parseJSON($('.j-objects__data').html());
            self.itemTpl = _.template($('.j-objects__item_tpl').html());
            if ($('.j-clients__item').length) {
                self.url = 'lab/client-objects';
            }
            self.bindEvents();
            self.renderList(self.list);
            self.initUI();
        },
        initUI: function(){
            var self = this;
            $('.j-objects__slider').each(function(){
                var $slider = $(this),
                    data = $(this).data();
                $slider.slider({
                    min: data.min,
                    max: data.max,
                    step: data.step,
                    values: [data.min, data.max],
                    range: true,
                    stop: function(event, ui) {
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
            self.$filter.find('.j-datepick').datepick({
                dateFormat: 'dd.mm.yyyy',
                onSelect: function(){
                    self.filter();
                }
            });
        },
        refreshUI: function() {
            var self = this;
            self.$list.find(':checkbox').iCheck();
        },
        bindEvents: function(){
            var self = this;
            $(document).on('click', '.j-view_client', function(){
                GV.Utils.blockUI();
                var form = $('#view_client');
                $("#view_client input[type=submit]").hide();
                $("#view_client input").attr("readonly",true);
                $.fancybox({
                    content: form
                });
                GV.Utils.unblockUI();
                return false;
            });
            $('.j-objects__toggle_filter').on('click', function(){
                var name = 'filter-' + $(this).data('name');
                $.cookie(name, ($.cookie(name) == 'open') ?  null : 'open', { expires: 365, path: 'default.htm' });
                $('.j-objects__filter').slideToggle().toggleClass('closed').toggleClass('opened');
                $(this).toggleClass('hide-filter').toggleClass('open-filter').find('span').toggle();
                return false;
            });
            $('.j-objects__reset_filter').on('click', function(){
                $('.j-objects__filter').find('input:text').each(function(){
                    var defaultValue = $(this).data('default');
                    if (defaultValue == 'undefined') defaultValue = '';
                    $(this).val(defaultValue).trigger('change');
                });
                $('.j-objects__filter').find('select').not(':disabled').val('').selectBox('refresh');
                self.filter();
                return false;
            });
            self.$filter.on('change', 'input, select', function(){
                self.filter();
            });
            self.$filter.on('submit', function(){
                self.filter();
                return false;
            });
            $('.j-objects__sort').on('click', function(){
                var $sorter = self.$filter.find('[name="sort"]'),
                    currentSort = $sorter.val(),
                    sort = $(this).data('sort');
                $('.j-objects__sort').removeClass('sort-up').removeClass('sort-down');
                if (currentSort == sort) {
                    $sorter.val('-' + sort);
                    $(this).addClass('sort-up');
                } else {
                    $sorter.val(sort);
                    $(this).addClass('sort-down');
                }
                self.filter();
                return false;
            });
            $(document).on('change', '[name="category"]', function(){
                var category = $(this).val(),
                    types = (category == 3) ? object_types['object_jewelry_type'] : object_types['object_stone_type'],
                    temp = '<option value="">-</option>';
                if (category) {
                    _.each(types, function(type){
                        temp += '<option value="' + type.value + '">' + type.name + '</option>';
                    });
                };
                $('[name="type"]').html(temp).selectBox('refresh').trigger('change');
            });
            $('[name="category"]').trigger('change');
        },
        filter: function(){
            var self = this,
                params = $.parseParams(self.$filter.serialize()),
                query = [];
            _.each(params, function(val, param){
                if (val != '' && val != null) {
                    if ((param == 'cost_min' && val == '0') || (param == 'cost_max' && val == '100000')
                        || (param == 'weight_min' && val == '0') || (param == 'weight_max' && val == '20')) {
                        delete params[param];
                    } else {
                        query.push(param + '=' + val);
                    }
                }
            });
            window.history.replaceState(null, null, self.url + ((query.length)?'?':'') + query.join('&'));
            self.getList(params, function(result){
                self.renderList(result.objects);
                $('.j-objects__count').text(result.objects_count);
            });
        },
        getList: function(params, callback){
            $.ajax({
                url: self.url,
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
        renderList: function(list){
            console.log(list);
            var self = this;
            var temp = '';
            _.each(list, function(item){
                temp +=  self.itemTpl(item);
            });
            self.$list.html(temp);
            self.refreshUI();
        },

        getEditor: function(options){
            var url = 'object/create';
            if (options.id) {
                url = 'object/update@id=' + options.id;
            }
            $.get(url, function(form){
                if (typeof options.callback === 'function') {
                    options.callback(form);
                }
            });
        },
        showEditor: function(form){
            var self = this;
            $.fancybox({
                content: form,
                afterShow: function() {
                    self.$editor = $('.j-object_editor');
                    self.initUI();
                }
            });
        }

    };
    if ($('.j-objects').length) {
        GV.Objects.init();
    }


})();