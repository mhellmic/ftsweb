var FileView = Backbone.View.extend({
  tagName: 'li',

  events: {
    'click button.delete': 'unrender'
  },

  template: _.template($('#template-file-list-item').html()),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'remove', this.remove);
  }, 

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  unrender: function() {
    this.model.destroy();
  }  
});

