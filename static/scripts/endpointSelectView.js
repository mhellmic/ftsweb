var EndpointSelectView = Backbone.View.extend({
  template: _.template($('#template-endpoint-select').html()),

  events: {
    'click button.load': 'changeEndpointLocation'
  },

  initialize: function(attrs) {
  },

  render: function() {
    console.log('selectview el: '+this.el);
    $(this.el).html(this.template(this.model.toJSON()));
  },

  changeEndpointLocation: function(evt) {
    alert('pressing the button');
    this.options.endpoint.set({location: 'test'});
  }
});

