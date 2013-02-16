var EndpointListView = Backbone.View.extend({

  template: _.template($('#template-endpoint-list').html()),

  initialize: function(attrs) {
    this.options = attrs;
    this.listenTo(this.options.endpoint, 'change', this.refreshList);
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  refreshList: function() {
    alert('it changed!!');
  }
});

