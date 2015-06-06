TrelloClone.Routers.Boards = Backbone.Router.extend({
  initialize: function(){
    this.$rootEl = $('#main');
    this.boards = new TrelloClone.Collections.Boards();
    this.boards.fetch({reset: true});
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  routes: {
    "": "BoardsIndex",
    "api/boards/:id": "BoardShow"
  },

  BoardsIndex: function() {
    var view = new TrelloClone.Views.BoardsIndex({collection: this.boards});
    this._swapView(view);
  },

  BoardShow: function(id) {
    var board = this.boards.getOrFetch(id);
    var view = new TrelloClone.Views.BoardShow({model: board });
    this._swapView(view);
  }
});
