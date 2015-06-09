TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({
  tagName: "li",
  className: "boardItem",
  template: JST['boards/item'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template({boardItem: this.model});
    this.$el.html(content);
    return this;
  }

});
