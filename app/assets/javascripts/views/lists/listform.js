TrelloClone.Views.ListForm = Backbone.View.extend({
  tagName: "form",
  template: JST["lists/listform"],
  className: "ListForm",
  // we pass in an empty model to the form
  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    return this;
  },
  events: {
    'submit': 'submit'
  },
  submit: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    attrs.board_id = this.model.attributes.board.get("id");
    var success = function() {
      this.collection.add(this.model);
    }.bind(this);

    function errors (model, response) {
      $('errors').empty();
      response.responseJSON.forEach(function(el){
        var $li = $('<li></li>');
        $li.text(el);
        $('.errors').append($li);
      }.bind(this));
    }
    this.model.save(attrs, {
      wait: true,
      success: success,
      error: errors.bind(this)
    });
  }
});
