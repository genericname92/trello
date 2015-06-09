TrelloClone.Views.CardForm = Backbone.View.extend({
  tagName: "form",
  template: JST["cards/cardform"],
  className: "CardForm",
  // we pass in an empty model to the form
  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },
  events: {
    'submit': 'submit'
  },
  submit: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    attrs.list_id = this.model.attributes.list.escape("id");
    var success = function() {
      this.collection.add(this.model);
      this.model = new TrelloClone.Models.Card({list: this.model.attributes.list});
    }.bind(this);

    this.model.save(attrs, {
      wait: true,
      success: success
    });
  }
});
