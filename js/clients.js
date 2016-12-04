(function () {
    'use strict';

    GV.Clients = {
        list: null,
        $clients: $('.j-clients'),
        $list: $('.j-clients__list'),
        $filter: $('.j-clients__filter'),
        itemTpl: null,
        init: function(){
            var self = this;
            self.bindEvents();
            if (self.$list.length) {
                self.list = $.parseJSON($('.j-clients__data').html());
                self.itemTpl = _.template($('.j-clients__item_tpl').html());
                self.renderList(self.list);
            }
            self.initUI();
        },
        initUI: function(){
            var self = this;
            self.$filter.find('.j-datepick').datepick({
                dateFormat: 'dd.mm.yyyy',
                onSelect: function(){
                    self.filter();
                }
            });
            $('select').selectBox();
        },
        bindEvents: function(){
            var self = this;
            $('.j-clients__toggle_filter').on('click', function(){
                var name = 'filter-' + $(this).data('name');
                $.cookie(name, ($.cookie(name) == 'open') ?  null : 'open', { expires: 365, path: 'default.htm' });
                $('.j-clients__filter').slideToggle().toggleClass('closed').toggleClass('opened');
                $(this).toggleClass('hide-filter').toggleClass('open-filter').find('span').toggle();
                return false;
            });
            $('.j-clients__reset_filter').on('click', function(){
                $('.j-clients__filter').find('input:text').val('');
                $('.j-clients__filter').find('select').not(':disabled').val('').selectBox('refresh');
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
            $('.j-clients__sort').on('click', function(){
                var $sorter = self.$filter.find('[name="sort"]'),
                    currentSort = $sorter.val(),
                    sort = $(this).data('sort');
                $('.j-clients__sort').removeClass('sort-up').removeClass('sort-down');
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
            $(document).on('click', '.j-create_client, .j-update_client', function(){
                GV.Utils.blockUI();
                var id = $(this).parents('.j-clients__item').data('id');
                self.getEditor({
                    id: id,
                    callback: function(form) {
                        self.showEditor(form);
                        GV.Utils.unblockUI();
                    }
                });
                return false;
            });
            $(document).on('submit', '.j-client_form', function(){
                GV.Utils.blockUI();
                var $form = $(this),
                    data = $form.serialize(),
                    action = $form.attr('action');
                $form.find('.b-error-text').remove();
                $form.find('.b-error').removeClass('b-error');
                $.ajax({
                    url: action,
                    method: 'post',
                    data: data,
                    success: function(result){
                        GV.Utils.unblockUI();
                        $('.fancybox-close').click();
                        if (self.$list.length) {
                            var temp = self.itemTpl(result.client);
                            $('.j-clients__item[data-id="'+ result.client.user_id +'"]').replaceWith(temp);
                        }
                    },
                    error: function(result){
                        GV.Utils.unblockUI();
                        _.each(result.responseJSON.errors, function(error, field) {
                            $form.find('[name="Profile[' + field + ']"]').addClass('b-error')
                                .after('<i class="b-error-text">' + error[0] + '</i>')
                        });
                    }
                });
                return false;
            });
        },
        filter: function(){
            var self = this,
                params = $.parseParams(self.$filter.serialize()),
                query = [];
            _.each(params, function(val, param){
                if (val != '' && val != null) {
                    query.push(param + '=' + val);
                }
            });
            window.history.replaceState(null, null, 'lab/clients' + ((query.length)?'?':'') + query.join('&'));
            self.getList(params, function(result){
                self.renderList(result.clients);
                //$('.j-clients__count').text(result.orders_count);
            });
        },
        getList: function(params, callback){
            $.ajax({
                url: 'lab/clients',
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
        },

        getEditor: function(options){
            var url = 'client/create';
            if (options.id) {
                url = 'client/update@id=' + options.id;
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
                    self.$editor = $('.j-client_editor');
                    self.initUI();
                }
            });
        }

    };
    if ($(".j-clients").length) {
        GV.Clients.init();
    }


})();