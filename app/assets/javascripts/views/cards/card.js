TrelloClone.Views.CardShow = Backbone.View.extend({
  tagName: 'li',
  className: 'singleCard ui-state-default',
  template: JST['cards/card'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template({card: this.model});
    this.$el.html(content);
    this.$el.attr("data-id", this.model.get("id"));
    return this;
  }

});
