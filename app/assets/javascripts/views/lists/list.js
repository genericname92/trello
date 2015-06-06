TrelloClone.Views.ListShow = Backbone.View.extend({
  tagName: 'ul',
  template: JST['lists/list'],
  className: "singleList sortable",
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    "mouseup .ui-sortable-handle": "saveOrder"
  },
  saveOrder: function(event){
    var counter = 0;
    var listContext = this;
    //grab each child of the el, use data id to find the appropriate object
    //update the object with a new counter since now it's in order
    $(this.$el).children().forEach(
      var attr = { ord: counter };
      card.save(attr, {
        wait: true,
        error: console.log("error")
      });
      counter++;
    );
  },
  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.$el.attr("data-id", this.model.get("id"));
    var that = this;
    this.model.cards().forEach( function(card){
      var newCard = new TrelloClone.Views.CardShow({model: card});
      that.$el.append(newCard.render().$el);
    });
    return this;
  }

});
