TrelloClone.Views.BoardShow = Backbone.View.extend({

  template: JST['boards/show'],
  className: 'singleBoard',

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },



// You can get the lists of the board by doing board.toJSON(board).lists so kew
  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    var that = this;
    this.model.lists().forEach( function(list){
      var newList = new TrelloClone.Views.ListShow({model: list});
      that.$el.append(newList.render().$el);
    });
    $( ".sortable" ).sortable();
    $( ".sortable" ).disableSelection();
    return this;
  }

});
