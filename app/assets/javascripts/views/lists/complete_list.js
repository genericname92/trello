TrelloClone.Views.CompleteList = Backbone.View.extend({
  template: JST["lists/complete_list"],
  className: "completeList",
  events: {
    'click button.destroyList': "destroyList"
  },

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    var newList = new TrelloClone.Views.ListShow({model: this.model});
    this.$el.append(newList.render().$el);
    var newCard = new TrelloClone.Models.Card( { list: this.model });
    var cardForm = new TrelloClone.Views.CardForm({model: newCard, collection: this.model.cards() });
    this.$el.append(cardForm.render().$el);
    this.listenTo(newCard, 'sync', this.render);
    return this;
  },

  destroyList: function() {
    this.model.destroy();
    this.remove();
  }
});
