TrelloClone.Views.BoardShow = Backbone.View.extend({

  template: JST['boards/show'],
  className: 'singleBoard center-block',

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add sync delete', this.render);
  },



// You can get the lists of the board by doing board.toJSON(board).lists so kew
  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    var that = this;
    this.model.lists().forEach( function(list){
      var completeList = new TrelloClone.Views.CompleteList({model: list});
      // var completeList = ($('<div>').addClass("completeList"));
      // var newList = new TrelloClone.Views.ListShow({model: list});
      // completeList.append(newList.render().$el);
      // var newCard = new TrelloClone.Models.Card( { list: list });
      // var cardForm = new TrelloClone.Views.CardForm({model: newCard, collection: list.cards() });
      // completeList.append(cardForm.render().$el);
      that.$el.append(completeList.render().$el);
      // that.listenTo(newCard, 'sync', that.render);
    });
    $( ".sortable" ).sortable({
      connectWith: $(".singleList")
    });
    $( ".sortable" ).disableSelection({
      connectWith: $(".singleList")
    });
    var newListModel = new TrelloClone.Models.List({board: this.model});
    var listForm = new TrelloClone.Views.ListForm({
      model: newListModel,
      collection: this.model.lists(),
      view: this
    });
    this.$el.append(listForm.render().$el);
    return this;
  }

});
