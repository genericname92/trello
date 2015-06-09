TrelloClone.Views.ListShow = Backbone.View.extend({
  tagName: 'ul',
  template: JST['lists/list'],
  className: "singleList sortable",
  initialize: function(options){
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'delete', this.render);
  },

  events: {
    "sortupdate": "saveOrder",
  },
  saveOrder: function(event){
    var counter = 0;
    var listContext = this;
    //grab each child of the el (this.value), use data id to find the appropriate object
    //update the object with a new counter since now it's in order
    $(this.$el).children().each(function(){
      var cardId = $(this).attr("data-id");
      var card = listContext.model.cards().get(cardId);
      card.set({ord: counter});
      card.save();
      counter++;
    });
  },
  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.$el.attr("data-id", this.model.get("id"));
    this.model.cards().forEach( function(card){
      var newCard = new TrelloClone.Views.CardShow({model: card, board: this.board});
      this.$el.append(newCard.render().$el);
    }.bind(this));
    return this;
  }

});
