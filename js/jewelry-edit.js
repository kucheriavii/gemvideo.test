/**
 * Created by taipov on 13.11.2015.
 */
(function () {
    'use strict';
    GV.JewelryEdit = {
        itemTpl:null,
        $list:$(".templateList"),
        $counter:0,
        init:function(){
          var  self = this;
            self.bindEvents();
            self.initColors();
            //self.itemTpl = _.template($(".j-jewelry_edit_col_tmpl").html());
        },
        bindEvents:function(){
            var self = this;
            $("#showStones").click(function(){
                $("#stones_list").toggle(300);
            });
            $("#stones_list .selectBox").on("change", function(){
               var stone_id = $(this).val();
                self.renderList(self.$counter, stone_id);
                self.$counter++;
                $('select').selectBox();
                //$("input[name=createdStoneId]").val();
               // $("#bottomFormBtn").trigger("click");
            });
            $(document).on("submit","#w0",function(){
            });
            $(document).on("click",".removeStone", function(e){
                var id = $(this).data("id");
                e.preventDefault();
                self.deleteObj(id,$(this));
                return false;
            });
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
        deleteObj:function($id,$obj) {
            var obj = $obj;
            $.ajax({
                url: 'client/delete-stone@stone_id='+$id,
                method: 'post',
                success: function(result){
                    if (result == '1'||'2') {
                        obj.parent().parent().hide();
                    }
                    console.log(result);
                },
                error: function(result){
                    console.log('error', result);
                }
            });

        },
        renderList:function($counter, stone_id) { // Выбор отображений
           var  self = this;
           var temp ='';
           var data ={counter:$counter, stone_id:stone_id};
           //temp = self.itemTpl(data);
            self.getList(data, function(result){
                self.$list.prepend(result);
                $("#showStones").trigger("click");
                $('body select').selectBox();
                self.initColors();
            });

        },
        getList: function(params, callback){
            $.ajax({
                url: 'client/jewelry-edit',
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

};

if($(".jewelry-edit").length){
    GV.JewelryEdit.init();
}
})();