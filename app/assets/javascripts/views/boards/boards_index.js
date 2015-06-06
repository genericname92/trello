TrelloClone.Views.BoardsIndex = Backbone.View.extend({

  template: JST['boards/index'],

  initialize: function(){
    this.listenTo(this.collection, 'add reset remove', this.render);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function (board) {
      var indexItem = new TrelloClone.Views.BoardsIndexItem({
        model: board
      });
      this.$('ul').append(indexItem.render().$el);
    }.bind(this));
    return this;
  }

});
