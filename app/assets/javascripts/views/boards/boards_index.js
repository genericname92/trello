TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  tagName: "ul",
  className: "boardContainer",
  template: JST['boards/index'],

  initialize: function(){
    this.listenTo(this.collection, 'add reset remove', this.render);
  },

  render: function(){
    this.collection.fetch();
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function (board) {
      var indexItem = new TrelloClone.Views.BoardsIndexItem({
        model: board
      });
      this.$el.append(indexItem.render().$el);
    }.bind(this));
    return this;
  }


});
