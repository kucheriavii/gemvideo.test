(function () {
    'use strict';

    GV.Orders = {
        list: null,
        $list: $('.j-orders__list'),
        $filter: $('.j-orders__filter'),
        params: [],
        itemTpl: null,
        init: function(){
            var self = this;
            self.list = $.parseJSON($('.j-orders__data').html());
            self.itemTpl = _.template($('.j-orders__item_tpl').html());
            self.bindEvents();
            self.renderList(self.list);
            self.initUI();
        },
        initUI: function(){
            var self = this;
            $('.j-orders__slider').each(function(){
                var $slider = $(this),
                    data = $slider.data();
                $(this).slider({
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
            $('.j-orders__toggle_filter').on('click', function(){
                var name = 'filter-' + $(this).data('name');
                $.cookie(name, ($.cookie(name) == 'open') ?  null : 'open', { expires: 365, path: 'default.htm' });
                $('.j-orders__filter').slideToggle().toggleClass('closed').toggleClass('opened');
                $(this).toggleClass('hide-filter').toggleClass('open-filter').find('span').toggle();
                return false;
            });
            $('.j-orders__reset_filter').on('click', function(){
                $('.j-orders__filter').find('input:text').each(function(){
                    var defaultValue = $(this).data('default');
                    if (defaultValue == 'undefined') defaultValue = '';
                    $(this).val(defaultValue).trigger('change');
                });
                $('.j-orders__filter').find('select').not(':disabled').val('').selectBox('refresh');
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
            $('.j-orders__sort').on('click', function(){
                var $sorter = self.$filter.find('[name="sort"]'),
                    currentSort = $sorter.val(),
                    sort = $(this).data('sort');
                $('.j-orders__sort').removeClass('sort-up').removeClass('sort-down');
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
            window.history.replaceState(null, null, 'lab/orders' + ((query.length)?'?':'') + query.join('&'));
            self.getList(params, function(result){
                self.renderList(result.orders);
                $('.j-orders__count').text(result.orders_count);
            });
        },
        getList: function(params, callback){
            $.ajax({
                url: 'lab/orders',
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
           // console.log(list);
            var self = this;
            var temp = '';
            _.each(list, function(item){
                temp +=  self.itemTpl(item);
            });
            self.$list.html(temp);
            self.refreshUI();
        },

        getEditor: function(options){
            var url = 'order/create';
            if (options.id) {
                url = 'order/update@id=' + options.id;
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
                    self.$editor = $('.j-order_editor');
                    self.initUI();
                }
            });
        }

    };
    if ($('.j-orders').length) {
        GV.Orders.init();
    }

})();