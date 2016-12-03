(function () {
    'use strict';

    GV.User = {
        init: function(){
            var self = this;
            self.bindEvents();
            self.initUI();
        },
        initUI: function(){
            if ($('.has-error').length) {
                $('.has-error').first().find('input, select').focus();
            }
        },
        bindEvents: function(){
            var self = this;
            $('.j-show_login_form').fancybox();
            $(document).on('submit', '.j-login-form', function() {
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
                        window.location = result.redirect ? result.redirect : 'default.htm';
                    },
                    error: function(result){
                        GV.Utils.unblockUI();
                        _.each(result.responseJSON.errors, function(error, field) {
                            $form.find('[name="login-form[' + field + ']"]').addClass('b-error')
                                .after('<i class="b-error-text">' + error[0] + '</i>')
                        });
                    }
                });
                return false;
            });
            $(document).on('submit', '.j-register-form', function() {
                GV.Utils.blockUI();
                var $form = $(this),
                    data = $form.serialize(),
                    action = $form.attr('action');
                $form.find('.b-error-text, .help-block').remove();
                $form.find('.b-error').removeClass('b-error');
                $.ajax({
                    url: action,
                    method: 'post',
                    data: data,
                    success: function(result){
                        window.location = 'client/profile';
                    },
                    error: function(result){
                        GV.Utils.unblockUI();
                        _.each(result.responseJSON.errors, function(error, field) {
                            $form.find('[name*="[' + field + ']"]').addClass('b-error')
                                .after('<i class="b-error-text">' + error[0] + '</i>')
                        });
                    }
                });
                return false;
            });
            $('.j-show_reg_details').on('click', function(){
                $(this).toggleClass('opened');
                $(this).next('.j-reg_details').slideToggle();
                return false;
            });
        },
    };
    GV.User.init();

})();